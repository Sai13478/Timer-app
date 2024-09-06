import React from "react";
import "./Timer.css";

const TimerControls = ({ onStart, onStop, onReset, isActive }) => {
  return (
    <div className="timer-controls">
      <button
        className="timer-button start"
        onClick={onStart}
        disabled={isActive}
      >
        Start
      </button>
      <button
        className="timer-button stop"
        onClick={onStop}
        disabled={!isActive}
      >
        Stop
      </button>
      <button className="timer-button reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default TimerControls;
