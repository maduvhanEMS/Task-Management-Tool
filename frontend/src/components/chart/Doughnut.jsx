import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import moment from "moment";

ChartJS.register(ArcElement);

export const options = {
  responsive: true,
  borderWidth: 5,
  cutout: "80%",
  plugins: {
    legend: {
      display: false,
      position: "bottom",
    },
    title: {
      display: false,
      text: "Projects per Director",
      fontSize: 20,
    },
  },
};

function DoughnutChart() {
  const { tasks } = useSelector((state) => state.tasks);
  const { users } = useSelector((state) => state.auth);

  const days = (targetDate) => {
    const difference = moment(targetDate, "YYYY-MM-DD").diff(
      moment(new Date(), "YYYY-MM-DD"),
      "days"
    );

    return difference;
  };

  const taskStatus = () => {
    const numberOfTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.outcomes !== "").length;
    const remainingTasks = tasks.filter(
      (task) => task.outcomes === "" && days(task.endDate) >= 0
    ).length;
    const overDueTasks = tasks.filter(
      (task) => task.outcomes === "" && days(task.endDate) < 0
    ).length;
    return [completedTasks, remainingTasks, overDueTasks];
  };

  const data = {
    labels: ["Completed", "In Progress", "Overdue"],
    datasets: [
      {
        label: "My First Dataset",
        data: taskStatus(),
        backgroundColor: ["#32CD32", "#63C5DA", "#D0312D"],
      },
    ],
  };

  return (
    <div className="card-header">
      <h3>Tasks</h3>
      <div className="card-legend center">
        <ul>
          <li>
            Completed <span className="number">({taskStatus()[0]})</span>
          </li>
          <li>
            Remaining <span className="number">({taskStatus()[1]})</span>
          </li>
          <li>
            Overdue <span className="number">({taskStatus()[2]})</span>
          </li>
        </ul>
      </div>
      <div className="cahrt-container">
        <div className="doughnut-chart-container">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
export default DoughnutChart;
