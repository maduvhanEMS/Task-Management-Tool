import React, { useEffect } from "react";
import ProjectItem from "./ProjectItem";
import { useSelector, useDispatch } from "react-redux";

function List() {
  const { projects } = useSelector((state) => state.projects);

  return (
    <section className="heading">
      <p>My Project(s)</p>
      <section className="content">
        <div className="goals">
          {projects.length > 1 ? (
            projects.map((project) => (
              <ProjectItem key={project._id} project={project} />
            ))
          ) : (
            <p> You have not created any project </p>
          )}
        </div>
      </section>
    </section>
  );
}

export default List;
