import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, resetProject } from '../features/projects/projectSlice';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    userId: '',
  });

  const { users } = useSelector((state) => state.auth);

  const { name, description, userId } = formData;

  const dispatch = useDispatch();

  const { isError, message, isSuccess, projectAdded } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (projectAdded) {
      toast.success(`${name} succefully added`);
    }

    dispatch(resetProject());
  }, [isError, message, isSuccess, dispatch, projectAdded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      toast.error('Please populate all fields');
    } else {
      const projectData = {
        name,
        description,
        userId,
      };

      dispatch(createProject(projectData));
      setFormData({
        name: '',
        description: '',
        userId: '',
      });
    }
  };

  return (
    <section className='heading'>
      <p>Add a project</p>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <select
              className='form-control'
              name='userId'
              id='name'
              value={userId}
              onChange={handleChange}
            >
              <option>Please assign a director</option>
              {users.map((user, index) => (
                <option key={index} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              name='name'
              id='name'
              value={name}
              placeholder='Enter project name'
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <textarea
              type='text'
              className='form-control'
              name='description'
              id='description'
              value={description}
              placeholder='Enter project description'
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}

export default Form;
