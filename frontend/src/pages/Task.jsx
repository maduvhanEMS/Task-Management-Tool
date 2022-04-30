import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import { RiTaskFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getTask } from "../features/tasks/taskSlice";
import TaskItem from "../components/TaskItem";

function Task() {
  const [currentProject, setCurrentProject] = useState({});

  const { projects } = useSelector((state) => state.projects);
  const { tasks, isLoading } = useSelector((state) => state.tasks);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projectId = params.projectId;

  // useEffect(() => {
  //   // dispatch(getTask({ goal: projectId }));
  //   const filter = projects.find((item) => item._id === projectId);
  //   setCurrentProject(filter);
  // }, [projectId, dispatch, projects]);

  // const onChange = (e) => {
  //   navigate(`/task/${e.target.value}`);
  // };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <section>
      <h1 className="heading">
        <RiTaskFill /> Tasks
      </h1>
      <div>
        {/* <section className="form">
          <form>
            <div className="form-group">
              <label htmlFor="projects" style={{ fontSize: "16px" }}>
                Project : {currentProject?.name}
              </label>
              <select
                name="projects"
                onChange={onChange}
                value={currentProject?._id}
              >
                {projects.map((item) => {
                  return <option value={item._id}>{item.name}</option>;
                })}
              </select>
            </div>
          </form>
        </section> */}
        <TaskForm />
        <section className="content">
          <h3 style={{ marginTop: "20px" }}>Current Tasks</h3>
          <div className="tasks">
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default Task;
