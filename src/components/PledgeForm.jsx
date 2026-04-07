import { useState } from "react";
import postPledge from "../api/post-pledge";
import "./CreateFundraiserForm.css";

function PledgeForm({ fundraiserId, onPledgeCreated }) {
  const [pledgeData, setPledgeData] = useState({
    amount: "",
    comment: "",
    anonymous: false,
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;

    setPledgeData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!pledgeData.amount) {
      setError("Please enter a pledge amount.");
      return;
    }

    postPledge(
      pledgeData.amount,
      pledgeData.comment,
      pledgeData.anonymous,
      fundraiserId
    )
      .then(() => {
        setPledgeData({
          amount: "",
          comment: "",
          anonymous: false,
        });

        if (onPledgeCreated) {
          onPledgeCreated();
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">Pledge Amount</label>
        <input
          type="number"
          id="amount"
          value={pledgeData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
        />
      </div>

      <div>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={pledgeData.comment}
          onChange={handleChange}
          placeholder="Leave a message"
        />
      </div>

      <div className="checkbox-row">
        <label htmlFor="anonymous">Pledge anonymously</label>
        <input
          type="checkbox"
          id="anonymous"
          checked={pledgeData.anonymous}
          onChange={handleChange}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit">Submit Pledge</button>
    </form>
  );
}

export default PledgeForm;