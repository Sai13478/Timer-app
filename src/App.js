import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [inputTime, setInputTime] = useState(0);
  const [unit, setUnit] = useState("seconds");
  const [isRunning, setIsRunning] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      setIsExpired(true);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const handleUnitChange = (event) => {
    setUnit(event.target.value);

    if (event.target.value === "seconds") {
      setTime(inputTime);
    } else {
      setTime(inputTime * 60);
    }
  };

  const handleStart = () => {
    setIsExpired(false);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(unit === "seconds" ? inputTime : inputTime * 60);
  };

  const handleInputChange = (event) => {
    setInputTime(event.target.value);
    if (unit === "seconds") {
      setTime(event.target.value);
    } else {
      setTime(event.target.value * 60);
    }
  };

  const handleClosePopup = () => {
    setIsExpired(false);
  };

  return (
    <div className="app">
      {isExpired && (
        <div className="overlay">
          <div className="popup">
            <h1>Start Over ⚠️⚠️</h1>
            <button className="popup-button" onClick={handleClosePopup}>
              OK
            </button>
          </div>
        </div>
      )}
      <div className="content">
        {!isExpired && (
          <>
            <h1>Timer</h1>
            <div className="controls">
              <label>
                Time:
                <input
                  type="number"
                  value={inputTime}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Unit:
                <select value={unit} onChange={handleUnitChange}>
                  <option value="seconds">Seconds</option>
                  <option value="minutes">Minutes</option>
                </select>
              </label>
            </div>
            <div className="time-display">
              <h2>
                {String(Math.floor(time / 3600)).padStart(2, "0")}:
                {String(Math.floor((time % 3600) / 60)).padStart(2, "0")}:
                {String(time % 60).padStart(2, "0")}
              </h2>
            </div>
            <div className="actions">
              <button className="start-button" onClick={handleStart}>
                Start
              </button>
              <button className="pause-button" onClick={handlePause}>
                Pause
              </button>
              <button className="reset-button" onClick={handleReset}>
                Reset
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
