import React, { Component } from 'react';
import Chart from 'react-google-charts';
import moment from 'moment';

const columns = [
  { type: 'string', label: 'Task ID' },
  { type: 'string', label: 'Task Name' },
  { type: 'string', label: 'Resource' },
  { type: 'date', label: 'Start Date' },
  { type: 'date', label: 'End Date' },
  { type: 'number', label: 'Duration' },
  { type: 'number', label: 'Percent Complete' },
  { type: 'string', label: 'Dependencies' },
];

const rows = [
  [
    'Research',
    'Find sources',
    null,
    new Date(2015, 0, 1),
    new Date(2015, 0, 5),
    null,
    100,
    null,
  ],
  [
    'Write',
    'Write paper',
    'write',
    null,
    new Date(2015, 0, 9),
    3 * 24 * 60 * 60 * 1000,
    25,
    'Research,Outline',
  ],
  [
    'Cite',
    'Create bibliography',
    'write',
    null,
    new Date(2015, 1, 7),
    1 * 24 * 60 * 60 * 1000,
    20,
    'Research',
  ],
  [
    'Complete',
    'Hand in paper',
    'complete',
    null,
    new Date(2015, 1, 10),
    1 * 24 * 60 * 60 * 1000,
    0,
    'Cite,Write',
  ],
  [
    'Outline',
    'Outline paper',
    'write',
    null,
    new Date(2015, 0, 6),
    1 * 24 * 60 * 60 * 1000,
    100,
    'Research',
  ],
];

export const options = {
  height: 575,
  // gantt: {
  //   defaultStartDateMillis: new Date(2015, 3, 28),
  // },
};

const GanttChart = ({ tasks }) => {
  const rowTasks = () => {
    let rows = [];
    for (var i = 0; i < tasks.length; i++) {
      let dataHolder = [];
      dataHolder.push(tasks[i].task_name);
      dataHolder.push(tasks[i].task_name);
      dataHolder.push(null);
      dataHolder.push(tasks[i].createdAt ? new Date(tasks[i].createdAt) : null);
      dataHolder.push(new Date(tasks[i].endDate));
      dataHolder.push(tasks[i].duration ? tasks[i].duration : null);
      dataHolder.push(tasks[i].outcomes ? 100 : 0);
      dataHolder.push(
        tasks[i].dependencies.length === 0
          ? null
          : tasks[i].dependencies.join(',')
      );
      rows.push(dataHolder);
    }
    return rows;
  };

  const data = [columns, ...rowTasks()];

  return tasks.length > 0 ? (
    <Chart
      chartType='Gantt'
      width='100%'
      height='50%'
      data={data}
      options={options}
    />
  ) : (
    'No Tasks'
  );
};

export default GanttChart;
