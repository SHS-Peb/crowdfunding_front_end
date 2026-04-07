import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="form-container">
      <div className="glass-card form-card">
        <h1>Log In</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;