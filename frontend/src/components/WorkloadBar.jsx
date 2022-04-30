import React from "react";

function WorkloadBar({
  completedTasks,
  numberOfTasks,
  remainingTasks,
  overDueTasks,
}) {
  const completed = {
    width: completedTasks,
    backgroundColor: "#32CD32",
    borderTopLeftRadius: "inherit",
    borderBottomLeftRadius: "inherit",
    marginRight: "1px",
  };
  const remaining = {
    width: remainingTasks,
    backgroundColor: "#63C5DA",
  };

  const overdue = {
    width: overDueTasks,
    backgroundColor: "#D0312D",
    borderTopRightRadius: "inherit",
    borderBottomRightRadius: "inherit",
    marginLeft: "1px",
  };
  return (
    <div className="progress-bar" style={{ width: `${numberOfTasks}%` }}>
      <div className="progress-child" style={completed}>
        <span className="progress-text"></span>
      </div>
      <div className="progress-child" style={remaining}>
        <span className="progress-text"></span>
      </div>
      <div className="progress-child" style={overdue}>
        <span className="progress-text"></span>
      </div>
    </div>
  );
}

export default WorkloadBar;
