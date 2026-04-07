import { Link, Outlet, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  const token = window.localStorage.getItem("token");
  const isStaff = window.localStorage.getItem("is_staff") === "true";

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("is_staff");
    navigate("/");
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/create-fundraiser">Create Fundraiser</Link>
            {isStaff && <Link to="/admin-fundraisers">Admin</Link>}
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </nav>

      <Outlet />
    </div>
  );
}

export default NavBar;