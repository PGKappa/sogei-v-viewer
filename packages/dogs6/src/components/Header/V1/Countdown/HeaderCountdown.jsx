import React, { useEffect, useMemo, useRef, useState } from 'react';
import "./HeaderCountdown.scss";

const NUM_PIECES = 20,
  FULL_PIECES_FACTOR = NUM_PIECES / 100;

const HeaderCountdown = ({ getCountdown }) => {
  const [countdown, setCountdown] = useState(getCountdown()),
    countdownText = useMemo(() => {
      if (!countdown.text) return "";
      return countdown.text;
    }, [countdown]),
    countdownPercentage = useMemo(() => {
      if (!countdown.percentage) return 0;
      return countdown.percentage;
    }, [countdown]),
    [numFullPieces, numEmptyPieces] = useMemo(() => {
      const numFullPieces = Math.min(Math.max(0, parseInt(FULL_PIECES_FACTOR * countdownPercentage)), NUM_PIECES),
        numEmptyPieces = Math.max(NUM_PIECES - numFullPieces, 0);
      return [numFullPieces, numEmptyPieces];
    }, [countdownPercentage]);

  const countdownIntervalRef = useRef();
  useEffect(() => {
    countdownIntervalRef.current = setInterval(() => {
      const newCountdown = getCountdown();
      setCountdown(newCountdown);
      if (parseInt((newCountdown.text || "").replace(":", "") == 0)) {
        console.log("newCountdown", newCountdown)
        clearInterval(countdownIntervalRef.current);
      }
    }, 1000);
    return () => clearInterval(countdownIntervalRef.current);
  }, []);

  return <div className="header-countdown">
    <div className="timer-container">
      <p className="timer-digits">{countdownText}</p>
    </div>

    <div className="progress">
      {[...Array(numFullPieces).keys()].map((item, key) => <div className="bar-item" key={key}></div>)}
      {[...Array(numEmptyPieces).keys()].map((item, key) => <div className="bar-item empty" key={key + numFullPieces}></div>)}
    </div>
  </div>
};
export default HeaderCountdown;
