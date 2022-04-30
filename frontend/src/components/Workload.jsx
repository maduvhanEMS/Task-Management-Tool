import React from "react";
import WorkloadBar from "./WorkloadBar";
import { useSelector } from "react-redux";
import moment from "moment";

function Workload() {
  const { tasks } = useSelector((state) => state.tasks);
  const { users } = useSelector((state) => state.auth);

  const days = (targetDate) => {
    const difference = moment(targetDate, "YYYY-MM-DD").diff(
      moment(new Date(), "YYYY-MM-DD"),
      "days"
    );
    return difference;
  };

  const taskForUser = (userId) => {
    const tasksData = tasks.filter((task) => task.user === userId);
    const numberOfTasks = tasksData.length;
    const completedTasks =
      (tasksData.filter((task) => task.outcomes !== "").length /
        numberOfTasks) *
      100;
    const remainingTasks =
      (tasksData.filter(
        (task) => task.outcomes === "" && days(task.endDate) >= 0
      ).length /
        numberOfTasks) *
      100;
    const overDueTasks =
      (tasksData.filter(
        (task) => task.outcomes === "" && days(task.endDate) < 0
      ).length /
        numberOfTasks) *
      100;
    return [
      numberOfTasks,
      isNaN(completedTasks) ? 0 : completedTasks,
      isNaN(remainingTasks) ? 0 : remainingTasks,
      isNaN(overDueTasks) ? 0 : overDueTasks,
    ];
  };

  return (
    <div className="card-header">
      <h3>Workload</h3>
      <div className="card-legend">
        <ul>
          <li>Completed</li>
          <li>Remaining</li>
          <li>Overdue</li>
        </ul>
      </div>

      {users.map((user) => {
        return (
          <div className="card-content" key={user._id}>
            <div className="card-users">
              <p>{user.name.split(" ")[0]}</p>
            </div>
            <div className="workload">
              <WorkloadBar
                numberOfTasks={
                  taskForUser(user._id)[0] === 0
                    ? 0
                    : taskForUser(user._id)[0] + 2
                }
                completedTasks={taskForUser(user._id)[1]}
                remainingTasks={taskForUser(user._id)[2]}
                overDueTasks={taskForUser(user._id)[3]}
              />
            </div>
          </div>
        );
      })}
      {/* <div className="card-content">
        <div className="card-users">
          <p>Maduvha</p>
        </div>
        <div className="workload" style={{ width: "50%" }}>
          <WorkloadBar />
        </div>
      </div>
      <div className="card-content">
        <div className="card-users">
          <p>Maduvha</p>
        </div>
        <div className="workload">
          <WorkloadBar />
        </div>
      </div>
      <div className="card-content">
        <div className="card-users">
          <p>Maduvha</p>
        </div>
        <div className="workload">
          <WorkloadBar />
        </div>
      </div> */}
    </div>
  );
}

export default Workload;
