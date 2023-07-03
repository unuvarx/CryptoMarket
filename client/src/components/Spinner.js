import React from "react";
import ClockLoader from "react-spinners/ClockLoader";

export default function Spinner() {
  return (
    <div className="loading-container">
      <ClockLoader
        color="red"
        cssOverride={{}}
        loading
        size={150}
        speedMultiplier={2}
      />
    </div>
  );
}
