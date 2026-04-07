import { useState } from "react";
import postLogin from "../api/post-login.js";
import { useNavigate } from "react-router-dom";
import "./CreateFundraiserForm.css";

function LoginForm() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!credentials.username || !credentials.password) {
      setError("Please enter your username and password.");
      return;
    }

    postLogin(credentials.username, credentials.password)
      .then((response) => {
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("is_staff", String(response.is_staff));
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          value={credentials.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;