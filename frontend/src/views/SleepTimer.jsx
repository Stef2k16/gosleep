import React, {useState} from 'react';
import { TimePicker } from "@material-ui/pickers";
import Button from '@material-ui/core/Button';
import {differenceInMilliseconds, isBefore, add} from 'date-fns'
import '../styles/sleepTimer.css';

export default  function SleepTimer() {
    const [selectedDate, setSelectedDate] = useState(add(new Date(), {minutes: 30}));
    const [timerRunning, setTimerRunning] = useState(false);

    const startTimer = () => {
        const timeDifference = differenceInMilliseconds(selectedDate, new Date()) + 'ms';
        setTimerRunning(true);
        window.backend.startTimer(timeDifference);
    }

    return (
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
                <Button variant="contained" color="warn" disabled={!selectedDate || isBefore(selectedDate, new Date())}>
                    Stop Timer
                </Button>
                :
                <Button variant="contained" color="primary" onClick={startTimer}
                        disabled={!selectedDate || isBefore(selectedDate, new Date())}>
                    Start Timer
                </Button>
            }

        </div>
    );
}
