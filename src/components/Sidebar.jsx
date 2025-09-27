import { NavLink } from "react-router-dom";
import img from '../assets/uff-n.png'

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
          
          <img className="brand-text ms-2" src={img } alt="Logo" style={{ width: "200px", height: "50px", objectFit: "contain" }} />

          {/* {console.log(img)} */}
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

          <NavLink
            to="/topVideos"
            className="sidebar-link"
            onClick={closeOffcanvas}
          >
            <i className="bi bi-youtube"></i>
            <span>Top Videos</span>
          </NavLink>

          <NavLink
            to="/topRetentions"
            className="sidebar-link"
            onClick={closeOffcanvas}
          >
            <i className="bi bi-arrow-repeat"></i>
            <span>Top Retentions</span>
          </NavLink>
          <NavLink
            to="/pop-up"
            className="sidebar-link"
            onClick={closeOffcanvas}
          >
             <i className="bi bi-box-arrow-up-right"></i>
            <span>Notification</span>
          </NavLink>
          <NavLink
            to="/feedback"
            className="sidebar-link"
            onClick={closeOffcanvas}
          >
            <i className="bi bi-chat-dots"></i>
            <span>Feedback</span>
          </NavLink>
          <NavLink
            to="/contribution"
            className="sidebar-link"
            onClick={closeOffcanvas}
          >
            <i className="bi bi-people"></i>
            <span>Contribution</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
