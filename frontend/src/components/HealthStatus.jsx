import React from 'react';

import { useSelector } from 'react-redux';
import moment from 'moment';

function HealthStatus() {
  const { tasks } = useSelector((state) => state.tasks);

  const days = (targetDate) => {
    const difference = moment(targetDate, 'YYYY-MM-DD').diff(
      moment(new Date(), 'YYYY-MM-DD'),
      'days'
    );
    return difference;
  };

  function startOfWeek(date) {
    var lastday = date.getDate() - date.getDay() - 7;
    return new Date(date.setDate(lastday));
  }

  function endOfWeek(date) {
    var lastday = date.getDate() - date.getDay() + 7;
    return new Date(date.setDate(lastday));
  }
  const healthCalculations = () => {
    const numberOfTasks = tasks.length;
    const completedTasks =
      (tasks.filter((task) => task.outcomes !== '').length / numberOfTasks) *
      100;

    const overDue = tasks.filter(
      (task) => task.outcomes === '' && days(task.endDate) < 0
    ).length;

    const overDuePerc =
      (tasks.filter((task) => task.outcomes === '' && days(task.endDate) < 0)
        .length /
        numberOfTasks) *
      100;

    const toBeCompleted = tasks.filter(
      (task) => task.outcomes === '' && days(task.endDate) >= 0
    ).length;

    //get the start and end of the week date
    const date = new Date();
    const start = moment(startOfWeek(date), 'YYYY-MM-DD');
    const end = moment(endOfWeek(date), 'YYYY-MM-DD');

    const weeklyComp = tasks.filter(
      (task) =>
        task.outcomes !== '' &&
        moment(task.updatedAt, 'YYYY-MM-DD') >= start &&
        moment(task.updatedAt, 'YYYY-MM-DD') <= end
    ).length;

    return [
      isNaN(completedTasks) ? 0 : completedTasks,
      overDue,
      toBeCompleted,
      overDuePerc,
      weeklyComp,
    ];
  };

  return (
    <div className='card-header'>
      <h3>Health</h3>
      <div className='card-content-health'>
        <div className='card-users'>
          <p>Time</p>
        </div>
        <div className='card-percent'>
          {Math.floor(healthCalculations()[3])}% behind schedule.
        </div>
      </div>
      <div className='card-content-health'>
        <div className='card-users'>
          <p>Tasks</p>
        </div>
        <div className='card-percent'>
          {healthCalculations()[2]} tasks to be completed.
        </div>
      </div>
      <div className='card-content-health'>
        <div className='card-users'>
          <p>Workload</p>
        </div>
        <div className='card-percent'>
          {healthCalculations()[1]} tasks overdue.
        </div>
      </div>
      <div className='card-content-health'>
        <div className='card-users'>
          <p>Progress</p>
        </div>
        <div className='card-percent'>
          {Math.floor(healthCalculations()[0])}% complete.
        </div>
      </div>
      <div className='card-content-health'>
        <div className='card-users'>
          <p>Weekly Progress</p>
        </div>
        <div className='card-percent'>
          {healthCalculations()[4]} tasks completed.
        </div>
      </div>
    </div>
  );
}

export default HealthStatus;
