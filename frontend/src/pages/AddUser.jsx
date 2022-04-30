import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { addUser, register, reset } from "../features/auth/authSlice";

function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    password2: "",
  });

  const { password, password2, name, email, role } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("User successfully added");
    }

    // dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password do not match");
    } else if (!name || !email) {
      toast.error("Populate all the fields");
    } else {
      const userData = {
        password,
        name,
        email,
        role,
      };
      dispatch(addUser(userData));
      setFormData({
        name: "",
        email: "",
        role: "",
        password: "",
        password2: "",
      });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="heading">
      <h1>
        <FaUser /> Add new user
      </h1>
      <p>Populate all the fields</p>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={name}
              placeholder="Enter your fullname"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password2"
              id="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              name="role"
              id="role"
              value={role}
              placeholder="Confirm password"
              onChange={handleChange}
            >
              <option>Please select admin rights</option>
              <option value="true">Admin rights</option>
              <option value="false">No Admin rights</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}

export default AddUser;
