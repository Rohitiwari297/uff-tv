import { NavLink, useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove auth token (adjust according to your project)
    localStorage.removeItem("token");  
    sessionStorage.removeItem("token");  

    // Optionally clear user state if you store it in context/redux
    // dispatch({ type: "LOGOUT" });

    // Redirect to login
    navigate("/login");
  };

  return (
    <header className="app-topbar">
      {/* Mobile burger */}
      <button
        className="btn btn-link px-2 d-lg-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarOffcanvas"
        aria-controls="sidebarOffcanvas"
        aria-label="Open menu"
      >
        <i className="bi bi-list fs-3"></i>
      </button>

      {/* Search */}
      <div className="topbar-search">
        <i className="bi bi-search"></i>
        <input type="text" className="form-control" placeholder="Search for anything here..." />
      </div>

      <div className="ms-auto d-flex align-items-center gap-2">
        {/* Profile dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-light d-flex align-items-center gap-2 topbar-profile-btn"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src="https://i.pravatar.cc/100?img=14" width="28" height="28" className="rounded-circle" />
            <span className="d-none d-sm-inline fw-medium">Uff TV</span>
            <i className="bi bi-chevron-down d-none d-sm-inline small"></i>
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow-sm py-2">
            <li className="px-3 pb-2 small text-muted">
              <div>Welcome!</div>
              <div className="fw-semibold text-dark">Uff TV</div>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <NavLink to="/change-password" className="dropdown-item d-flex align-items-center gap-2">
                <i className="bi bi-lock"></i> Change Password
              </NavLink>
            </li>
            <li>
              <button
                className="dropdown-item d-flex align-items-center gap-2"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i> Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
