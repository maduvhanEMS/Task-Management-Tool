import React, { useEffect } from "react";
import ProjectItem from "./ProjectItem";
import { useSelector, useDispatch } from "react-redux";
import ProgressBar from "./ProgressBar";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

function SideList() {
  const { projects } = useSelector((state) => state.projects);

  const color = "blue";

  const show = { display: "none" };

  const line = { textDecoration: "line-through" };

  return (
    <section>
      <p>Projects Status</p>
      <section className="side-list">
        <div className="projects">
          {projects.length > 1 ? (
            projects.map((project) => (
              <>
                <div className="goal">
                  <h5>{project.name}</h5>
                  <div style={{ marginTop: "-10px" }}>
                    <ProgressBar
                      bgcolor={color}
                      progress="60"
                      height={20}
                      style={{ color: "black" }}
                      font="14px"
                      margin="-35px"
                    />
                  </div>
                  <button className="arrow">
                    <MdOutlineKeyboardArrowDown />
                  </button>
                </div>
                <div className="dropdown">
                  <ul>
                    <li style={line}>Maduvah</li>
                    <li>Maduvah</li>
                    <li>Maduvah</li>
                  </ul>
                </div>
              </>
            ))
          ) : (
            <p> You have not created any project </p>
          )}
        </div>
      </section>
    </section>
  );
}

export default SideList;
