import CreateFundraiserForm from "../components/CreateFundraiserForm";

function CreateFundraiserPage() {
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