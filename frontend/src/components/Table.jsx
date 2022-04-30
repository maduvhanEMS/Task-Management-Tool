import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

let PageSize = 5;

function Table() {
  const { projects, isLoading, message, isError } = useSelector(
    (state) => state.projects
  );

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return projects.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const color = "blue";

  const countFunction = (projectId) => {
    const availableTasks = tasks.filter((task) => task.goal === projectId);
    const numberOfTasks =
      (tasks.filter((task) => task.goal === projectId && task.outcomes !== "")
        .length /
        availableTasks.length) *
      100;

    return isNaN(numberOfTasks) ? 0 : numberOfTasks;
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <table className="table" style={{ minHeight: "300px" }}>
        <thead>
          <tr>
            <th>Project Owner</th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Tast(s)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.length < 1 ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  fontSize: "17px",
                  textAlign: "center",
                  padding: "20px 0",
                }}
              >
                No projets available in the table
              </td>
            </tr>
          ) : (
            currentTableData.map((item) => (
              <tr key={item._id}>
                <td>{item.user.name}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  {tasks.filter((task) => task.goal === item._id).length > 0 ? (
                    <Link className="link" to={`/tasks/${item._id}`}>
                      view task(s)
                    </Link>
                  ) : user?.role ? (
                    <Link className="link" to={`/task/${item._id}`}>
                      add task(s)
                    </Link>
                  ) : (
                    "Contact Admin"
                  )}
                </td>
                <td>
                  {
                    <ProgressBar
                      bgcolor={color}
                      progress={Math.floor(countFunction(item._id))}
                      height={18}
                      font="12px"
                      margin="-18px"
                    />
                  }
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={projects.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}

export default Table;
