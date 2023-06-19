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

  const isCommitDate = (date) => {
    const currentYear = new Date().getFullYear();
    return commitData.some(
      (commitDate) =>
        commitDate.getDate() === date.getDate() &&
        commitDate.getMonth() === date.getMonth() &&
        commitDate.getFullYear() === currentYear
    );
  };

  const getMonthLabels = () => {
    const months = [];
    const currentMonth = new Date().getMonth();

    for (let i = 0; i < 12; i++) {
      const month = (currentMonth + i) % 12;
      months.push(
        <div
          className="month-label"
          key={i}
          style={{ flex: `${getMonthWidth(month)} 1 0` }}
        >
          {getMonthName(month)}
        </div>
      );
    }

    return months;
  };

  const getMonthWidth = (month) => {
    const currentMonth = new Date().getMonth();
    const totalDays = new Date(
      new Date().getFullYear(),
      month + 1,
      0
    ).getDate();
    const pastDays = currentMonth === month ? new Date().getDate() : totalDays;
    return `${(pastDays / totalDays) * 100}%`;
  };

  const getMonthName = (month) => {
    return new Date(new Date().getFullYear(), month, 1).toLocaleString(
      "default",
      { month: "short" }
    );
  };

  return (
    <div className="commit-graph">
      <div className="y-axis">
        <div className="day-of-week">Mon</div>
        <div className="day-of-week"></div>
        <div className="day-of-week">Wed</div>
        <div className="day-of-week"></div>
        <div className="day-of-week">Fri</div>
      </div>
      <div className="grid-container">
        <div className="month-labels">{getMonthLabels()}</div>
        <div className="grid">
          {Array.from({ length: 7 * 52 }, (_, index) => (
            <div
              key={index}
              className={`grid-item ${
                isCommitDate(new Date()) ? "overlay-green" : ""
              }`}
              onClick={() => handleCommit(new Date())}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommitGraph;
