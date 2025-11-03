import React, { useState, useEffect } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [runStatus, setRunStatus] = useState(false);
  const [lapTime, setLapTime] = useState([]);

  // Handle the timer interval with useEffect
  useEffect(() => {
    let intervalId;
    if (runStatus) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }

    // Cleanup: Clear interval when runStatus changes or component unmounts
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [runStatus]);

  const handleStart = () => {
    if (!runStatus) {
      setRunStatus(true); // Start the timer
    }
  };

  const handleStop = () => {
    setRunStatus(false); // Stop the timer
  };

  const handleReset = () => {
    setRunStatus(false); // Stop the timer
    setTime(0); // Reset time to 0
    setLapTime([]); // Clear lap times
  };

  const handleLap = () => {
    if (runStatus) {
      setLapTime([...lapTime, time]); // Record current time as a lap
    }
  };

  // Format time for display (e.g., MM:SS:MS)
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Stopwatch</h1>
      <div>
        <h2>{formatTime(time)}</h2>
      </div>
      <div>
        <button onClick={handleStart} disabled={runStatus}>
          Start
        </button>
        <button onClick={handleStop} disabled={!runStatus}>
          Stop
        </button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleLap} disabled={!runStatus}>
          Add Lap
        </button>
      </div>
      <div>
        <h3>Lap Times</h3>
        <ul>
          {lapTime.map((lap, index) => (
            <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Stopwatch;