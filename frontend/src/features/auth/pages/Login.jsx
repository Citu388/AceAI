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
    <main className="auth-shell">
      <section className="auth-shell__brand">
        <div className="brand-content">
          <span className="brand-logo">AceAI</span>
          <h2>Walk into every interview already knowing what they'll ask.</h2>
          <p>
            Paste a job description, get a personalized prep plan, and practice
            with AI feedback tuned to that exact role.
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
          <h1>Welcome back</h1>
          <p className="form-subtitle">
            Log in to pick up where your prep left off.
          </p>

          <form onSubmit={handleSubmit}>
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

            <button className="button primary-button">Login</button>
          </form>

          <p className="form-footer">
            Don't have an account? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
