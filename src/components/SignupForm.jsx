import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../api/post-signup";
import "./CreateFundraiserForm.css";

function SignupForm() {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;

    setSignupData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!signupData.username || !signupData.email || !signupData.password) {
      setError("Please fill in all fields.");
      return;
    }

    postSignup(signupData.username, signupData.email, signupData.password)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={signupData.username}
          onChange={handleChange}
          placeholder="Enter username"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={signupData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={signupData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit">Create Account</button>
    </form>
  );
}

export default SignupForm;