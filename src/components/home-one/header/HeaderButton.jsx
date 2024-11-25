import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";



function HeaderButton() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fungsi untuk toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Fungsi logout
  const handleLogout = () => {
    // Hapus data dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    // Reset state
    setToken(null);
    setUserName(null);

    // Arahkan ke halaman login
    navigate("/sign-in");
  };

  // Update state saat localStorage berubah
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserName(localStorage.getItem("userName"));
  }, []);

  return (
    <div className="header-btn header-btn-l1 ms-auto d-none d-xs-inline-flex">
      {token ? (
        <div className="dropdown">
          <button
            className="aximo-default-btn pill aximo-header-btn"
            onClick={toggleDropdown}
          >
            Welcome, {userName || "User"}
          </button>
          {dropdownOpen && (
            <div
              className="dropdown-menu show"
              style={{ position: "absolute", top: "100%", left: "0" }}
            >
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link className="aximo-default-btn pill aximo-header-btn" to="/sign-in">
          Login
        </Link>
      )}
    </div>
  );
}

export default HeaderButton;
