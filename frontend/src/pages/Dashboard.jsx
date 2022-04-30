import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Workload from '../components/Workload';
import { getProject, resetProject } from '../features/projects/projectSlice';
import { getTasks, resetUpdate, resetTasks } from '../features/tasks/taskSlice';
import { getAllusers, reset } from '../features/auth/authSlice';
import DoughnutChart from '../components/chart/Doughnut';
import ProJectStatus from '../components/ProjectStatus';
import HealthStatus from '../components/HealthStatus';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch(0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getProject());
    dispatch(getTasks());
    dispatch(getAllusers());

    return () => {
      dispatch(reset());
      dispatch(resetProject());
      dispatch(resetUpdate());
      dispatch(resetTasks());
    };
  }, [user, navigate, dispatch]);

  return (
    <>
      <div className='card-container'>
        <div className='card'>
          <DoughnutChart />
        </div>
        <div className='card'>
          <Workload />
        </div>
        <div className='card'>
          <ProJectStatus />
        </div>
        <div className='card'>
          <HealthStatus />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
