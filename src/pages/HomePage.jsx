import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
  const { fundraisers, isLoading, error } = useFundraisers();

  console.log("fundraisers:", fundraisers);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const fundraiserList = Array.isArray(fundraisers)
    ? fundraisers
    : Array.isArray(fundraisers?.results)
    ? fundraisers.results
    : [];

  return (
    <div>
      <section className="hero">
        <h1 className="hero-title">JUST ONE THING!</h1>
        <h2 className="hero-subtitle">WHAT COULD CHANGE YOUR LIFE?</h2>
      </section>

      <section className="browse-section">
        <h2>Browse Fundraisers</h2>
      </section>

      <div id="fundraiser-list">
        {fundraiserList.length > 0 ? (
          fundraiserList.map((fundraiserData) => (
            <FundraiserCard
              key={fundraiserData.id}
              fundraiserData={fundraiserData}
            />
          ))
        ) : (
          <p>No fundraisers yet.</p>
        )}
      </div>

      <section className="about-section">
        <h2>About Us</h2>
        <div className="glass-card about-card">
          <p>
            Just One Thing! is a crowdfunding space for the one opportunity,
            ticket, course, move, dream, or life change that could make all
            the difference.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;