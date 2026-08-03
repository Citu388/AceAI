// import React from "react";
import "../auth.form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await handleLogin({ email, password });
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
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
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

          <button className="button primary-button">Login</button>
        </form>

        <p>
          Don't have an account? <Link to={"/register"}>Register</Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Login;
