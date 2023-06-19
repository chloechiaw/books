import React, { useState } from "react";
import "./ContributionGraph.css";

const CommitGraph = () => {
  const [commitData, setCommitData] = useState([]);

  const handleCommit = (date) => {
    // Update the commitData array with the clicked date
    setCommitData((prevCommitData) => {
      const updatedCommitData = [...prevCommitData];
      updatedCommitData.push(date);
      return updatedCommitData;
    });
  };

  const isCommitDate = (month, day) => {
    const date = new Date();
    const currentYear = date.getFullYear();
    return commitData.some(
      (commitDate) =>
        commitDate.getMonth() === month &&
        commitDate.getDate() === day &&
        commitDate.getFullYear() === currentYear
    );
  };

  const renderGrid = () => {
    const date = new Date();
    const currentMonth = date.getMonth();
    const daysInMonth = new Date(
      date.getFullYear(),
      currentMonth + 1,
      0
    ).getDate();

    const grids = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const isMonday =
        new Date(date.getFullYear(), currentMonth, day).getDay() === 1;
      const isWednesday =
        new Date(date.getFullYear(), currentMonth, day).getDay() === 3;
      const isFriday =
        new Date(date.getFullYear(), currentMonth, day).getDay() === 5;

      grids.push(
        <div
          key={day}
          className={`grid-item ${
            isMonday
              ? "bg-red-500"
              : isWednesday
              ? "bg-blue-500"
              : isFriday
              ? "bg-green-500"
              : "bg-gray-200"
          } ${isCommitDate(currentMonth, day) ? "overlay-green" : ""}`}
          onClick={() =>
            handleCommit(new Date(date.getFullYear(), currentMonth, day))
          }
        >
          {isCommitDate(currentMonth, day) ? <span className="dot" /> : null}
        </div>
      );
    }

    return grids;
  };

  return (
    <div className="commit-graph">
      <div className="y-axis">
        <div className="day-of-week">Mon</div>
        <div className="day-of-week">Wed</div>
        <div className="day-of-week">Fri</div>
      </div>
      <div className="grid-container">{renderGrid()}</div>
    </div>
  );
};

export default CommitGraph;
