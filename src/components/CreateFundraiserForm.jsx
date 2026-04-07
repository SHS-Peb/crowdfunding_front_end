import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postFundraiser from "../api/post-fundraiser";

function CreateFundraiserForm() {
  const navigate = useNavigate();

  const [fundraiserData, setFundraiserData] = useState({
    title: "",
    description: "",
    target: "",
    image: "",
    is_open: true,
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;

    setFundraiserData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const token = window.localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to create a fundraiser.");
      return;
    }

    if (
      !fundraiserData.title ||
      !fundraiserData.description ||
      !fundraiserData.target ||
      !fundraiserData.image
    ) {
      setError("Please fill in all fields.");
      return;
    }

    postFundraiser(
      fundraiserData.title,
      fundraiserData.description,
      fundraiserData.target,
      fundraiserData.image,
      fundraiserData.is_open
    )
      .then((response) => {
        navigate(`/fundraiser/${response.id}`);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={fundraiserData.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={fundraiserData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="target">Target:</label>
        <input
          type="number"
          id="target"
          value={fundraiserData.target}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          value={fundraiserData.image}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="is_open">Open for pledges:</label>
        <input
          type="checkbox"
          id="is_open"
          checked={fundraiserData.is_open}
          onChange={handleChange}
        />
      </div>

      {error && <p>{error}</p>}

      <button type="submit">Create Fundraiser</button>
    </form>
  );
}

export default CreateFundraiserForm;