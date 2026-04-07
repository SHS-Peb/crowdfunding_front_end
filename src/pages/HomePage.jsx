import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
  const { fundraisers, isLoading, error } = useFundraisers();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div id="fundraiser-list">
      {fundraisers.map((fundraiserData) => {
        return (
          <FundraiserCard
            key={fundraiserData.id}
            fundraiserData={fundraiserData}
          />
        );
      })}
    </div>
  );
}

export default HomePage;