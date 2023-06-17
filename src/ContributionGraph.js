import React from "react";
import "./ContributionGraph.css";

import "./ContributionGraph.css";

const ContributionGraph = () => {
  // Generate some dummy data for demonstration
  const contributionData = [
    [0, 0, 0, 1, 2, 3, 0],
    [0, 0, 2, 3, 1, 0, 0],
    [0, 0, 1, 1, 0, 2, 0],
    [0, 1, 1, 0, 2, 1, 0],
    [0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    // Add more data for other months...
  ];

  const renderBoxes = () => {
    const daysOfWeek = ["Mon", "Wed", "Fri"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const boxes = [];
    let dayIndex = 0;

    for (let month = 0; month < contributionData.length; month++) {
      for (let day = 0; day < contributionData[month].length; day++) {
        const commits = contributionData[month][day];

        const boxStyle = {
          backgroundColor: commits > 0 ? "#216e39" : "#ebedf0",
        };

        boxes.push(
          <div
            key={`${month}-${day}`}
            className={`box ${daysOfWeek[dayIndex % daysOfWeek.length]}`}
            style={boxStyle}
          ></div>
        );

        dayIndex++;
      }
    }

    return boxes;
  };

  return (
    <div className="graph">
      <div className="y-axis">
        <div className="y-label">Mon</div>
        <div className="y-label">Wed</div>
        <div className="y-label">Fri</div>
      </div>
      <div className="x-axis">
        {[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ].map((month) => (
          <div key={month} className="x-label">
            {month}
          </div>
        ))}
      </div>
      <div className="boxes">{renderBoxes()}</div>
    </div>
  );
};

export default ContributionGraph;
