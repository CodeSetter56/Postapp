import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { user, login } = useAuth();

  const formHandler = async (e) => {
    e.preventDefault();
    if (user) {
      setError("You are already signed in");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <form onSubmit={formHandler}>
          <label className="label">Email</label>
          <input
            type="text"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn btn-neutral mt-4"
            disabled={loading}
            type="submit"
          >
            Login
          </button>
        </form>
      </fieldset>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}

export default Login;
