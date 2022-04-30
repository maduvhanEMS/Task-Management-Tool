import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '../components/Table';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import Spinner from "../components/Spinner";
import {
  getProject,
  reset,
  resetProject,
} from '../features/projects/projectSlice';
import { getAllusers } from '../features/auth/authSlice';
import { getTasks, resetTasks } from '../features/tasks/taskSlice';
import Spinner from '../components/Spinner';

function Goals() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { isLoading, isError, message, projects } = useSelector(
    (state) => state.projects
  );
  useEffect(() => {
    // if (isError) {
    //   toast.error(message);
    // }
    dispatch(getAllusers());
    dispatch(getTasks());
    dispatch(getProject());

    return () => {
      dispatch(resetTasks());
      dispatch(resetProject());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>
          <FaUser style={{ marginRight: '10px' }} />
          Welcome {user.name}
        </h3>
        {user.role && (
          <Link to='/projectForm' className='link'>
            Add Project
          </Link>
        )}
      </div>
      <Table />
    </div>
  );
}

export default Goals;
