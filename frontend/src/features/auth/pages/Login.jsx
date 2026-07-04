// import React from "react";
import "../auth.form.scss";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              name="email"
            ></input>
          </div>

          <div className="input-group">
            <label htmlFor="password">Email</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              name="password"
            ></input>
          </div>

          <button className="button primary-button">Login</button>
        </form>
      </div>
    </main>
  );
};

export default Login;
