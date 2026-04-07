import { useEffect, useState } from "react";
import patchFundraiserStatus from "../api/patch-fundraiser-status";
import "./AdminFundraisersPage.css";

function AdminFundraisersPage() {
  const [fundraisers, setFundraisers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const token = window.localStorage.getItem("token");
  const isStaff = window.localStorage.getItem("is_staff") === "true";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/fundraisers/`, {
      method: "GET",
      headers: token
        ? {
            Authorization: `Token ${token}`,
          }
        : {},
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load fundraisers");
        }
        return response.json();
      })
      .then((data) => {
        const fundraiserList = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : [];

        setFundraisers(fundraiserList);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [token]);

  const handleStatusChange = (id, status) => {
    patchFundraiserStatus(id, status)
      .then(() => {
        setFundraisers((prevFundraisers) =>
          prevFundraisers.map((fundraiser) =>
            fundraiser.id === id
              ? { ...fundraiser, status: status }
              : fundraiser
          )
        );
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (!token || !isStaff) {
    return <p>Not authorized.</p>;
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-page">
      <h1>Fundraiser Approvals</h1>

      <div className="admin-fundraiser-list">
        {fundraisers.length > 0 ? (
          fundraisers.map((fundraiser) => (
            <div key={fundraiser.id} className="glass-card admin-fundraiser-card">
              <img src={fundraiser.image} alt={fundraiser.title} />
              <h2>{fundraiser.title}</h2>
              <p>{fundraiser.description}</p>
              <p><strong>Status:</strong> {fundraiser.status}</p>

              <div className="admin-actions">
                <button onClick={() => handleStatusChange(fundraiser.id, "APPROVED")}>
                  Approve
                </button>
                <button onClick={() => handleStatusChange(fundraiser.id, "REJECTED")}>
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No fundraisers found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminFundraisersPage;