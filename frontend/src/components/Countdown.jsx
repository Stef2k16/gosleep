import React from 'react';
import {Typography} from "@material-ui/core";
import '../styles/timer.css';
import {intervalToDuration} from 'date-fns';

export default function Countdown({remainingTime, showTimer}) {

    const duration = intervalToDuration({start: 0, end: remainingTime});

    return (
      <div className="timer-frame">
          {showTimer ?
            <>
              <Typography className="timer-time" color="textPrimary" variant="h5" component="span">{duration.hours.toString().padStart(2, '0')}</Typography>
              <Typography className="timer-separator" color="textPrimary" variant="h5" component="span">:</Typography>
              <Typography className="timer-time" color="textPrimary" variant="h5" component="span">{duration.minutes.toString().padStart(2, '0')}</Typography>
              <Typography className="timer-separator" color="textPrimary" variant="h5" component="span">:</Typography>
              <Typography className="timer-time" color="textPrimary" variant="h5" component="span">{duration.seconds.toString().padStart(2, '0')}</Typography>
            </> : undefined
          }

      </div>
    );
}