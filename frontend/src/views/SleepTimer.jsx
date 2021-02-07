import React, {useState} from 'react';
import { TimePicker } from "@material-ui/pickers";
import Button from '@material-ui/core/Button';

export default  function SleepTimer() {
    const [selectedDate, handleDateChange] = useState(new Date());
    const startTimer = () => window.backend.startTimer();

    return (
        <>
            <TimePicker
                clearable
                ampm={false}
                label="24 hours"
                value={selectedDate}
                onChange={handleDateChange}
                minutesStep={1}
            />
            <Button variant="contained" color="primary" onClick={startTimer}>Shutdown</Button>
        </>
    );
}
