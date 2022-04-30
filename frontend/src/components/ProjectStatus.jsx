import React from "react";
import ProjectBar from "./ProjectBar";
import { useSelector } from "react-redux";
import moment from "moment";

function ProJectStatus() {
  const { tasks } = useSelector((state) => state.tasks);
  const { users } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);

  const days = (targetDate) => {
    const difference = moment(targetDate, "YYYY-MM-DD").diff(
      moment(new Date(), "YYYY-MM-DD"),
      "days"
    );
    return difference;
  };

  const taskForUser = (projectId) => {
    const tasksData = tasks.filter((task) => task.goal === projectId);
    const numberOfTasks = tasksData.length;
    const completedTasks =
      (tasksData.filter((task) => task.outcomes !== "").length /
        numberOfTasks) *
      100;

    return [numberOfTasks, isNaN(completedTasks) ? 0 : completedTasks];
  };

  const colors = (percent) => {
    let color;
    if (percent <= 10) {
      color = "red";
    } else if (percent > 10 && percent <= 20) {
      color = "pink";
    } else if (percent > 20 && percent <= 50) {
      color = "purple";
    } else if (percent > 50 && percent <= 80) {
      color = "#63C5DA";
    } else {
      color = "#32CD32";
    }

    return color;
  };

  return (
    <div className="card-header">
      <h3>Progress</h3>
      <div className="card-name">
        <p style={{ width: "30%" }}>Project</p>
        <p>Percent Completion</p>
      </div>
      {projects.map((project, index) => {
        return (
          <div className="card-content-project" key={project._id}>
            <div className="card-users" style={{ display: "flex" }}>
              <span
                style={{
                  width: "20px",
                  padding: "1px",
                  display: "block",
                  fontSize: "12px",
                }}
              >
                {index + 1}.
              </span>
              <p style={{ display: "flex" }}>{project.name}</p>
            </div>
            <div
              className="card-percent"
              style={{ color: colors(Math.floor(taskForUser(project._id)[1])) }}
            >
              <p>{`${Math.floor(taskForUser(project._id)[1])}%`}</p>
            </div>
            <div className="workload">
              <ProjectBar
                completedTasks={taskForUser(project._id)[1]}
                color={colors(Math.floor(taskForUser(project._id)[1]))}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProJectStatus;
