import React, { useState, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import "./Timer.css";

const CountdownTimer = () => {
  const [initialTime, setInitialTime] = useState(3600); 
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTime(initialTime); 
  }, [initialTime]);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false); 
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStart = () => {
    if (time > 0) {
      setIsActive(true);
    }
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(initialTime);
  };

  const handleTimeChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setInitialTime(value);
      setTime(value);
    }
  };

  return (
    <div className="timer">
      <TimerDisplay time={time} />
      <TimerControls
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
        isActive={isActive}
      />
      <div className="time-input">
        <input
          type="number"
          value={initialTime}
          onChange={handleTimeChange}
          min="1"
          placeholder="Set time in seconds"
        />
      </div>
    </div>
  );
};

export default CountdownTimer;
