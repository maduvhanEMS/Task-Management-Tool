import React from "react";

function ProjectItem({ project }) {
  return (
    <div className="goal">
      <h5>{project.name}</h5>
      <span>{new Date(project.createdAt).toLocaleDateString("en-US")}</span>
    </div>
  );
}

export default ProjectItem;
