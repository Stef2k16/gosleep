import React, {useState} from 'react';
import { TimePicker } from "@material-ui/pickers";
import Button from '@material-ui/core/Button';
import {differenceInMilliseconds, isBefore, add} from 'date-fns'

export default  function SleepTimer() {
    const [selectedDate, handleDateChange] = useState(add(new Date(), {minutes: 30}));
    const startTimer = () => {
        const timeDifference = differenceInMilliseconds(selectedDate, new Date()) + 'ms';
        window.backend.startTimer(timeDifference);
    }

    return (
        <>
            <TimePicker
                clearable
                ampm={false}
                label="Shutdown At"
                value={selectedDate}
                onChange={handleDateChange}
                minutesStep={1}
            />
            <Button variant="contained" color="primary" onClick={startTimer}
                    disabled={!selectedDate || isBefore(selectedDate, new Date())}>Start Timer</Button>
        </>
    );
}
