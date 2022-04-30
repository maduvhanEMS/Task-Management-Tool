import React from "react";

function TaskItem({ task }) {
  return (
    <div className="task">
      <div className="date">
        {new Date(task?.createdAt).toLocaleDateString("en-US")}
      </div>
      <h2>{task?.task_name}</h2>
      <button className="close">X</button>
    </div>
  );
}

export default TaskItem;
