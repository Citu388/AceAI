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
    <main className="auth-shell">
      <section className="auth-shell__brand">
        <div className="brand-content">
          <span className="brand-logo">AceAI</span>
          <h2>Your next offer starts with knowing what to say.</h2>
          <p>
            Create an account and get a strategy built from the actual job
            description you're applying to — not generic tips.
          </p>

          <div className="mock-interview-card">
            <div className="mock-interview-card__header">
              <span className="mock-dot"></span>
              <span className="mock-dot"></span>
              <span className="mock-dot"></span>
              <span className="mock-label">Live Analysis</span>
            </div>
            <p className="mock-question">
              "Tell me about a time you led a project under pressure."
            </p>
            <div className="mock-feedback">
              <span className="mock-feedback__badge">STAR structure</span>
              <span className="mock-feedback__check">✓ Strong</span>
            </div>
          </div>
        </div>
      </section>

      <section className="auth-shell__form">
        <div className="form-container">
          <h1>Create your account</h1>
          <p className="form-subtitle">
            Start building your interview strategy in minutes.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                placeholder="Enter Username"
                name="username"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Enter email address"
                name="email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                placeholder="Enter password"
                name="password"
              />
            </div>

            {error && <p className="error">{error}</p>}

            <button className="button primary-button">Register</button>
          </form>

          <p className="form-footer">
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
