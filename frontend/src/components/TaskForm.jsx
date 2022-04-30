import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createTask, getTask } from '../features/tasks/taskSlice';
import { getProject } from '../features/projects/projectSlice';
import { getAllusers } from '../features/auth/authSlice';
import { postEmail } from '../features/email/emailSlice';

function TaskForm() {
  const params = useParams();
  const projectId = params.projectId;
  const [formData, setFormData] = useState({
    task_name: '',
    objective: '',
    startDate: '',
    endDate: '',
    duration: '',
    dependencies: [],
    userId: '',
    goal: projectId,
  });
  const [currentProject, setCurrentProject] = useState({});

  const { projects } = useSelector((state) => state.projects);
  const { users } = useSelector((state) => state.auth);
  const { tasks, isLoading } = useSelector((state) => state.tasks);

  const {
    task_name,
    objective,
    startDate,
    endDate,
    dependencies,
    userId,
    goal,
    duration,
  } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProject());
    dispatch(getAllusers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTask({ goal: projectId }));
    const filter = projects.find((item) => item._id === projectId);
    setCurrentProject(filter);

    //update the dependices to zero
    setFormData((prevState) => ({ ...prevState, dependencies: [] }));
  }, [projectId, dispatch, projects]);

  const handleChange = (e) => {
    const { value } = e.target;
    navigate(`/task/${value}`);

    const prevState = { ...formData };
    prevState.goal = value;
    setFormData(prevState);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckBox = (e) => {
    const { value } = e.target;
    const prevState = { ...formData };
    const index = prevState.dependencies.indexOf(value);
    if (index > -1) {
      prevState.dependencies.splice(index, 1);
    } else {
      prevState.dependencies.push(value);
    }
    setFormData(prevState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (dependencies.length > 0) {
      if (
        !task_name ||
        !duration ||
        !endDate ||
        !objective ||
        !userId ||
        !projectId
      ) {
        toast.error('Please populate all the fields');
      } else {
        const taskData = {
          task_name,
          objective,
          startDate,
          endDate,
          dependencies,
          userId,
          goal,
          duration,
        };
        dispatch(createTask(taskData));
        const emailUser = users.find((item) => item._id === userId);
        const emailData = {
          email: emailUser.email,
          task_name,
          objective,
          user_name: emailUser.name,
          startDate: startDate,
          endDate: endDate,
          duration: duration,
          dependencies: dependencies,
          url: `http://localhost:3000/tasks/${projectId}`,
          message: `Task has been assigned to you. You can view it `,
        };
        dispatch(postEmail(emailData));
        setFormData({
          task_name: '',
          objective: '',
          startDate: '',
          endDate: '',
          dependencies: [],
          userId: '',
          duration: '',
          goal: projectId,
        });
      }
    } else {
      if (
        !task_name ||
        !startDate ||
        !endDate ||
        !objective ||
        !userId ||
        !projectId
      ) {
        toast.error('Please populate all the fields');
      } else {
        const taskData = {
          task_name,
          objective,
          startDate,
          endDate,
          dependencies,
          userId,
          goal,
          duration,
        };
        dispatch(createTask(taskData));
        const emailUser = users.find((item) => item._id === userId);
        const emailData = {
          email: emailUser.email,
          task_name,
          objective,
          user_name: emailUser.name,
          startDate: startDate,
          endDate: endDate,
          duration: duration,
          dependencies: dependencies,
          url: 'http://localhost:3000/tasks/${projectId}',
          message: `Task has been assigned to you. You can view it `,
        };
        dispatch(postEmail(emailData));
        setFormData({
          task_name: '',
          objective: '',
          startDate: '',
          endDate: '',
          dependencies: [],
          userId: '',
          goal: projectId,
        });
      }
    }
  };

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div
          className='form-group'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: '10px',
          }}
        >
          <div className='form-group'>
            <select
              name='goal'
              onChange={handleChange}
              value={currentProject?._id}
            >
              {projects.map((item) => {
                return <option value={item._id}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className='form-group'>
            <select
              className='form-control'
              name='userId'
              id='name'
              value={userId}
              onChange={onChange}
            >
              <option>Please assign a director</option>
              {users.map((user, index) => (
                <option key={index} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          className='form-group'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: '10px',
          }}
        >
          <div className='form-group'>
            <input
              type='text'
              name='task_name'
              value={task_name}
              onChange={onChange}
              placeholder='Enter a task name'
            />
          </div>
          <div className='form-group'>
            <textarea
              type='text'
              name='objective'
              value={objective}
              onChange={onChange}
              placeholder='Enter a goal/objective'
            />
          </div>
        </div>

        <div className='form-group'>
          <label className='text'>Current Tasks (Select Dependencies)</label>
          <div className='custom-checkboxes'>
            {tasks.map((item) => (
              <label className='custom-checkbox'>
                <input
                  type='checkbox'
                  className='custom-checkbox-input'
                  checked={dependencies.includes(item.task_name) ? true : false}
                  name={item.task_name}
                  value={item.task_name}
                  onChange={handleCheckBox}
                />
                <span className='custom-checkbox-text'>{item.task_name}</span>
              </label>
            ))}
          </div>
        </div>
        <div
          className='form-group'
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: '10px',
          }}
        >
          {dependencies.length > 0 ? (
            <div className='form-group'>
              <label className='text'>
                Duration <span className='required'>*</span>
              </label>
              <input
                type='number'
                name='duration'
                value={duration}
                onChange={onChange}
                placeholder='duration'
              />
            </div>
          ) : (
            <div className='form-group'>
              <label className='text'>
                Start Date <span className='required'>*</span>
              </label>
              <input
                type='datetime-local'
                name='startDate'
                value={startDate}
                onChange={onChange}
                placeholder='target date'
              />
            </div>
          )}

          <div className='form-group'>
            <label className='text'>
              End Date <span className='required'>*</span>
            </label>
            <input
              type='datetime-local'
              name='endDate'
              value={endDate}
              onChange={onChange}
              placeholder='target date'
            />
          </div>
        </div>

        <div className='form-group'>
          <button className='btn  btn-block' type='submit'>
            Add Task
          </button>
        </div>
      </form>
    </section>
  );
}

export default TaskForm;
