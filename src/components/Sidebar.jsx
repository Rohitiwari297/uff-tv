import { NavLink } from "react-router-dom";

export default function Sidebar({ onItemClickClose = false }) {
  const closeOffcanvas = () => {
    if (onItemClickClose) {
      const el = document.querySelector("#sidebarOffcanvas");
      if (el) {
        const offcanvas =
          bootstrap.Offcanvas.getInstance(el) || new bootstrap.Offcanvas(el);
        offcanvas.hide();
      }
    }
  };

  return (
    <div className="sidebar-shell">
      {/* Logo/Header - removed py-2 */}
      <div className="sidebar-brand d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <span className="brand-icon"></span>
          <strong className="brand-text ms-2">Uff tv</strong>
        </div>

        {/* Close button for mobile */}
        <button
          type="button"
          className="btn-close btn-close-white d-lg-none"
          aria-label="Close"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>

      {/* only this part scrolls */}
      <div className="sidebar-scroll">
        <div className="sidebar-section-title">DASHBOARDS</div>
        <nav className="sidebar-menu">
          <NavLink
            to="/dashboard"
            end
            className="sidebar-link"
            onClick={closeOffcanvas}
          >
            <i className="bi bi-speedometer2"></i>
            <span>Dashboards</span>
          </NavLink>
        </nav>

        <nav className="sidebar-menu">
          <NavLink to="/users" className="sidebar-link" onClick={closeOffcanvas}>
            <i className="bi bi-people"></i>
            <span>Users List</span>
          </NavLink>

          <NavLink
            to="/category"
            className="sidebar-link"
            onClick={closeOffcanvas}
          >
            <i className="bi bi-grid"></i>
            <span>Category List</span>
          </NavLink>

            <NavLink
            to="/video"
            className="sidebar-link"
            onClick={closeOffcanvas}
          >
            <i className="bi bi-camera-video"></i>
            <span>Video List</span>
          </NavLink>

          <NavLink
            to="/live-video"
            className="sidebar-link"
            onClick={closeOffcanvas}
          >
            <i className="bi bi-camera-video"></i>
            <span>Live Video</span>
          </NavLink>

          <NavLink
            to="/banner"
            className="sidebar-link"
            onClick={closeOffcanvas}
          >
            <i className="bi bi-image"></i>
            <span>Banners</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
