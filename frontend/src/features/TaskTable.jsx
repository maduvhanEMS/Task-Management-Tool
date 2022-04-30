import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../features/tasks/taskSlice';
import UpdateTask from './UpdateTask';
import Pagination from './Pagination';

let PageSize = 5;

function TaskTable({ tasks }) {
  const [checked, setChecked] = useState([]);
  const [outcomes, setOutcomes] = useState('');
  const [task, setTask] = useState({});
  const [display, setDisplay] = useState('none');

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return tasks.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const params = useParams();
  const dispatch = useDispatch();

  const projectId = params.projectId;

  const { user } = useSelector((state) => state.auth);

  useState(() => {
    if (tasks) {
      const indexNumbers = tasks.map((item) => false);
      setChecked(indexNumbers);
    }
  }, [tasks]);

  const onChange = (e, i) => {
    const updatedState = checked.map((item, index) =>
      index === i ? !item : item
    );
    setChecked(updatedState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const task = tasks.find((task) => task._id === e.target.value);
    setTask(task);
    setDisplay('block');
  };

  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Responsive Person</th>
            <th>Goal/Objective</th>
            <th>Outcome(s)</th>
            <th>CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.length < 1 ? (
            <tr>
              <td
                colSpan='5'
                style={{
                  fontSize: '17px',
                  padding: '20px 0',
                  textAlign: 'center',
                }}
              >
                No projets available in the table
              </td>
            </tr>
          ) : (
            currentTableData?.map((item, index) => (
              <tr key={item._id}>
                <td style={{ textAlign: 'left' }}>
                  {item.outcomes === '' && user.role && (
                    <input
                      type='checkbox'
                      className='form-input'
                      value={checked[index]}
                      onChange={(e) => onChange(e, index)}
                    />
                  )}
                  {item.task_name}
                </td>
                <td>{item.user.name}</td>
                <td>{item.objective}</td>
                <td>{item.outcomes}</td>
                <td>
                  {checked[index] ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button
                        className='btn btn-update'
                        type='submit'
                        value={item._id}
                        name='id'
                        onClick={onSubmit}
                      >
                        Update
                      </button>
                      <button
                        className='btn btn-delete'
                        type='submit'
                        value={item._id}
                        name='id'
                        onClick={onSubmit}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    moment(item.createdAt, 'YYYY-MM-DD').fromNow()
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        className='pagination-bar'
        currentPage={currentPage}
        totalCount={tasks.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <UpdateTask task={task} display={display} setDisplay={setDisplay} />
    </>
  );
}

export default TaskTable;
