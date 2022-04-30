import React, { useState, useEffect } from 'react';
import GanttChart from '../components/GanttChart';
import { FcTimeline } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProject } from '../features/projects/projectSlice';
import { getTask, reset } from '../features/tasks/taskSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function GanttPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, message, projects } = useSelector((state) => state.projects);
  const { tasks, isLoading, isSuccess } = useSelector((state) => state.tasks);

  const [projectId, setProjectId] = useState('');

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getProject());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, navigate]);

  useEffect(() => {
    if (projects.length > 0) {
      setProjectId(projects[0]._id);
    }
  }, [projects]);

  useEffect(() => {
    dispatch(getTask({ goal: projectId }));
  }, [projectId, dispatch]);

  const onChange = (e) => {
    setProjectId(e.target.value);
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className='container'>
      <div className='heading'>
        <h1>
          <FcTimeline /> Project Timeline
        </h1>
      </div>
      <form style={{ minWidth: '800px' }}>
        <div
          className='form-group'
          style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}
        >
          <label
            className='text'
            style={{ marginRight: '20px', fontWeight: 'bold' }}
          >
            Project:
          </label>
          <select value={projectId} onChange={onChange}>
            {projects?.map((project, index) => (
              <option value={project?._id} key={index}>
                {project?.name}
              </option>
            ))}
          </select>
        </div>
      </form>
      <GanttChart tasks={tasks} />
    </section>
  );
}

export default GanttPage;
