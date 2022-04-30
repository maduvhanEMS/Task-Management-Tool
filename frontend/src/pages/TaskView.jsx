import React, { useEffect, useState } from "react";
import TaskTable from "../components/TaskTable";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, dispatch, useDispatch } from "react-redux";
import { getProject } from "../features/projects/projectSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { getTask, reset } from "../features/tasks/taskSlice";

function TaskView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const projectId = params.projectId;

  const [currentProject, setcurrentProjec] = useState({});

  const { isError, message, projects } = useSelector((state) => state.projects);
  const { tasks, isLoading, isSuccess } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getProject());

    dispatch(reset());
  }, [dispatch, isError, message]);

  useEffect(() => {
    const project = projects.find((item) => item._id === projectId);
    setcurrentProjec(project);
    dispatch(getTask({ goal: projectId }));
  }, [projectId, dispatch]);

  const onChange = (e) => {
    navigate(`/tasks/${e.target.value}`);
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div>
        <h3>
          <FaUser style={{ marginRight: "10px" }} />
          Project Owner: {currentProject?.user?.name.toUpperCase()}
        </h3>

        <form
          style={{
            minWidth: "800px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            className="form-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label
              className="text"
              style={{ marginRight: "20px", fontWeight: "bold" }}
            >
              Project:
            </label>
            <select value={projectId} onChange={onChange}>
              {projects?.map((project) => (
                <option value={project?._id}>{project?.name}</option>
              ))}
            </select>
          </div>
          {user.role && (
            <Link className="link" to={`/task/${projectId}`}>
              add task(s)
            </Link>
          )}
        </form>
      </div>
      <TaskTable tasks={tasks} isSuccess={isSuccess} />
    </div>
  );
}

export default TaskView;
