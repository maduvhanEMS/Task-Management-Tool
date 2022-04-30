import React, { useEffect } from "react";
import Form from "../components/Form";
import { FaListAlt } from "react-icons/fa";
import List from "../components/List";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProject, reset } from "../features/projects/projectSlice";
import Spinner from "../components/Spinner";

function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, message, projects } = useSelector(
    (state) => state.projects
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getProject());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, navigate]);

  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <section className="heading">
      <h1>
        <FaListAlt /> Projects
      </h1>
      <Form />
    </section>
  );
}

export default Projects;
