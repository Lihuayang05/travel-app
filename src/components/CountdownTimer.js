import React, { useState, useEffect, useRef } from "react";

function CountdownTimer() {
  const [travelDate, setTravelDate] = useState(new Date("2024-12-31"));
  const [timeLeft, setTimeLeft] = useState({});
  const [editingDate, setEditingDate] = useState(false);

  const countdownRef = useRef(null); // Reference to the countdown container

  // Function to calculate the time remaining
  const calculateTimeLeft = (date) => {
    const now = new Date();
    const difference = date - now;
    if (difference <= 0) return {}; // Return empty if the date has passed

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };

    return timeLeft;
  };

  // Use effect to update the timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(travelDate));
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [travelDate]);

  // Handle when the timer itself is clicked
  const handleTimerClick = () => {
    setEditingDate(true); // Enable date editing when the timer is clicked
  };

  // Handle the date change
  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setTravelDate(newDate); // Update the state with the new date
  };

  // Function to format the date as YYYY-MM-DD for input
  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits for month
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for day
    return `${year}-${month}-${day}`;
  };

  // Handle clicks outside of the countdown timer to stop editing the date
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countdownRef.current && !countdownRef.current.contains(event.target)) {
        setEditingDate(false); // Close the date picker when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="countdown-container" ref={countdownRef}>
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
            value={formatDateForInput(travelDate)}
          />
        )}
      </div>
    </div>
  );
}

export default CountdownTimer;
