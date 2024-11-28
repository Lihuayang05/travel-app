import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [travelDate, setTravelDate] = useState(new Date("2024-12-31")); 
  const [timeLeft, setTimeLeft] = useState({});
  const [editingDate, setEditingDate] = useState(false); 

  const calculateTimeLeft = (date) => {
    const now = new Date();
    const difference = date - now;
    if (difference <= 0) return {};

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };

    return timeLeft;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(travelDate));
    }, 1000);

    return () => clearInterval(interval); 
  }, [travelDate]);

  const handleTimerClick = () => {
    setEditingDate(true);
  };

  const handleDateChange = (event) => {
    setTravelDate(new Date(event.target.value));
    setEditingDate(false); 
  };

  return (
    <div className="list">
      <div className="countdown-timer" onClick={handleTimerClick}>
        {!editingDate ? (
          <>
            <span>{timeLeft.days} Days </span>
            <span>{timeLeft.hours} Hours </span>
            <span>{timeLeft.minutes} Minutes </span>
            <span>{timeLeft.seconds} Seconds </span>
          </>
        ) : (
          <input
            type="date"
            onChange={handleDateChange}
            value={travelDate.toISOString().split("T")[0]} 
          />
        )}
      </div>
    </div>
  );
}

export default CountdownTimer;
