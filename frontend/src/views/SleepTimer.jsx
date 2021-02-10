import React, {useState, useEffect} from 'react';
import { TimePicker } from "@material-ui/pickers";
import Button from '@material-ui/core/Button';
import {differenceInMilliseconds, isBefore, add} from 'date-fns'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import '../styles/sleepTimer.css';
import Timer from "../components/Timer";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SleepTimer() {
    const [selectedDate, setSelectedDate] = useState(add(new Date(), {minutes: 30}));
    const [timerRunning, setTimerRunning] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        let timeout;
        if (remainingTime > 0){
            timeout = setTimeout(() => setRemainingTime(remainingTime - 1000), 1000);
        }
        return () => {
            timeout && clearTimeout(timeout)
        }
    }, [remainingTime]);

    const startTimer = async () => {
        if (!selectedDate) {
            return;
        }
        let timeDifference = differenceInMilliseconds(selectedDate, new Date());
        if (isBefore(selectedDate, new Date())) {
            const day = 24 * 60 * 60 * 1000;
            timeDifference += day;
        }
        const success = await window.backend.StartTimer(timeDifference + 'ms');
        setRemainingTime(timeDifference);
        if(!success) {
            setSnackbarMessage('Starting the timer failed :(');
            setShowSnackbar(true);
            return;
        }
        setTimerRunning(true);
    }

    const stopTimer = async () => {
        const success = await window.backend.StopTimer();
        if(!success) {
            setSnackbarMessage('Stopping the timer failed :(');
            setShowSnackbar(true);
            return;
        }
        setTimerRunning(false);
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowSnackbar(false);
    };

    return (
        <>
            <div className="timer-wrapper">
                <TimePicker
                    clearable
                    ampm={false}
                    label="Shutdown At"
                    value={selectedDate}
                    onChange={setSelectedDate}
                    minutesStep={1}
                    className="time-picker"
                />
                {timerRunning ?
                    <Button className="timer-button" variant="contained" color="secondary" onClick={stopTimer}>
                        Stop Timer
                    </Button>
                    :
                    <Button className="timer-button" variant="contained" color="primary" onClick={startTimer}
                            disabled={!selectedDate}>
                        Start Timer
                    </Button>
                }
                <Timer remainingTime={remainingTime} showTimer={timerRunning}/>
            </div>
            <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
