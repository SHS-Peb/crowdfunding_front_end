import { Navigate } from "react-router-dom";
import CreateFundraiserForm from "../components/CreateFundraiserForm";

function CreateFundraiserPage() {
  const token = window.localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="form-container">
      <div className="glass-card form-card">
        <h1>Create a Fundraiser</h1>
        <CreateFundraiserForm />
      </div>
    </div>
  );
}

export default CreateFundraiserPage;