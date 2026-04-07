import SignupForm from "../components/SignupForm";

function SignupPage() {
  return (
    <div className="form-container">
      <div className="glass-card form-card login-card">
        <h1>Sign Up</h1>
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;