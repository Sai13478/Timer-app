import React, { useState, useEffect } from "react";
import TimerDisplay from "./TimerDisplay.js";
import TimerControls from "./TimerControls";
import "./Timer.css";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
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
    </div>
  );
};

export default Timer;
