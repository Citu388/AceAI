// import React from "react";
import "../auth.form.scss";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister({ username, email, password });
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loader"></div>
      </main>
    );
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              id="username"
              placeholder="Enter Username"
              name="username"
            ></input>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              placeholder="Enter email address"
              name="email"
            ></input>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              placeholder="Enter password"
              name="password"
            ></input>
          </div>

          {error && <p className="error">{error}</p>}

          <button className="button primary-button">Register</button>
        </form>

        <p>
          Already have an account? <Link to={"/login"}>Login</Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Register;
