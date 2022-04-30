import React, { useEffect, useState } from "react";
import { RiTaskFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reset, updateTask, resetUpdate } from "../features/tasks/taskSlice";

function UpdateTask({ task, display, setDisplay }) {
  const [formData, setFormData] = useState({
    task_name: "",
    objective: "",
    outcomes: "",
  });

  const dispatch = useDispatch();

  const { isUpdated, isError, message } = useSelector((state) => state.tasks);

  const { task_name, objective, outcomes } = formData;
  const style = { display: display };

  //update
  useEffect(() => {
    if (task) {
      setFormData({
        task_name: task.task_name,
        objective: task.objective,
        outcomes: task.outcomes,
      });
    }
  }, [task]);

  useEffect(() => {
    if (isUpdated) {
      setDisplay("none");
      toast.success(`Task Succefully updated`);
    }
  }, [isUpdated, dispatch, message, isError]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!task_name || !objective) {
      toast.error("Please update all the required fields");
    } else {
      const taskData = {
        taskId: task._id,
        task_name,
        outcomes,
        objective,
      };
      dispatch(resetUpdate());
      dispatch(updateTask(taskData));
    }
  };

  return (
    <section style={style}>
      <div className="form-container">
        <div className="form-card">
          <h1>
            <RiTaskFill /> Update Task
          </h1>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <label className="text">
                Task <span className="required">*</span>
              </label>
              <input
                type="text"
                name="task_name"
                placeholder="Enter task name"
                onChange={onChange}
                value={task_name}
              />
            </div>
            <div className="form-group">
              <label className="text">
                Objective <span className="required">*</span>
              </label>
              <input
                type="text"
                name="objective"
                placeholder="Enter Objective"
                onChange={onChange}
                value={objective}
              />
            </div>
            <div className="form-group">
              <label className="text">Outcome</label>
              <textarea
                type="text"
                name="outcomes"
                rows={5}
                onChange={onChange}
                value={outcomes}
              />
            </div>
            <div className="form-group" style={{ display: "flex" }}>
              <button className="btn btn-update" type="submit">
                Update
              </button>
              <button className="btn btn-delete" type="reset">
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UpdateTask;
