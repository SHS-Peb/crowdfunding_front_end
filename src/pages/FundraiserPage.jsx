import { useParams } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import PledgeForm from "../components/PledgeForm";
import "./FundraiserPage.css";

function FundraiserPage() {
  const { id } = useParams();
  const { fundraiser, isLoading, error } = useFundraiser(id);

  const token = window.localStorage.getItem("token");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!fundraiser) return <p>Fundraiser not found.</p>;

  const totalRaised =
    fundraiser.pledges?.reduce((total, pledge) => total + Number(pledge.amount), 0) || 0;

  const goalAmount = Number(fundraiser.goal || 0);
  const progressPercent =
    goalAmount > 0 ? Math.min((totalRaised / goalAmount) * 100, 100) : 0;

  const handlePledgeCreated = () => {
    window.location.reload();
  };

  return (
    <div className="fundraiser-page">
      <div className="glass-card pledge-card">
        <h2 className="panel-title">Make a Pledge</h2>

        {token ? (
          <PledgeForm fundraiserId={fundraiser.id} onPledgeCreated={handlePledgeCreated} />
        ) : (
          <p className="login-message">Please log in to make a pledge.</p>
        )}
      </div>

      <div className="glass-card fundraiser-detail-card">
        <h1 className="fundraiser-page-title">{fundraiser.title}</h1>

        <img
          className="fundraiser-detail-image"
          src={fundraiser.image}
          alt={fundraiser.title}
        />

        <div className="fundraiser-detail-text">
          <p>{fundraiser.description}</p>

          <p className="deadline-text">
            <strong>Status:</strong> {fundraiser.is_open ? "Open" : "Closed"}
          </p>

          <p className="goal-text">The Goal: ${goalAmount}</p>
        </div>

        <div className="progress-wrap">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <p className="raised-text">
            We reached ${totalRaised} raised so far!
          </p>
        </div>

        <div className="pledge-history">
          <h3>Recent Pledges</h3>

          {fundraiser.pledges && fundraiser.pledges.length > 0 ? (
            <ul className="pledge-list">
              {fundraiser.pledges.map((pledgeData) => (
                <li key={pledgeData.id} className="pledge-item">
                  <strong>${pledgeData.amount}</strong>{" "}
                  from {pledgeData.anonymous ? "Anonymous" : pledgeData.supporter}
                  {pledgeData.comment && <span> — {pledgeData.comment}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p>No pledges yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FundraiserPage;