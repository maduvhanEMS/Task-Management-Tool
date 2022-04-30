import React from "react";

function ProjectBar({ completedTasks, color }) {
  const completed = {
    width: `${completedTasks}%`,
    backgroundColor: color,
    borderRadius: "inherit",
    borderRadius: "inherit",
    marginRight: "1px",
  };

  return (
    <div
      className="progress-bar"
      style={{
        marginTop: "0px",
        height: "20px",
        backgroundColor: "white",
      }}
    >
      <div className="progress-child" style={completed}>
        <span className="progress-text"></span>
      </div>
    </div>
  );
}

export default ProjectBar;
