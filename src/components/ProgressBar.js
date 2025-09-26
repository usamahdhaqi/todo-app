import React from "react";

const ProgressBar = ({ progress }) => (
  <>
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <p>{progress}% selesai</p>
  </>
);

export default ProgressBar;
