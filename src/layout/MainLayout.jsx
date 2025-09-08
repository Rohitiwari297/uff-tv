import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="app-layout">
      {/* Desktop sidebar (fixed, its inner area scrolls) */}
      <aside className="app-sidebar d-none d-lg-flex">
        <Sidebar />
      </aside>

      {/* Right panel */}
      <div className="app-main">
        <Topbar />
        <main className="app-content">
          <Outlet />  {/* 👈 Required to render Dashboard, Products, etc. */}
        </main>
        <Footer />
      </div>

      {/* Mobile Offcanvas sidebar */}
      <div
        className="offcanvas offcanvas-start app-offcanvas"
        tabIndex="-1"
        id="sidebarOffcanvas"
        aria-labelledby="sidebarOffcanvasLabel"
      >
        <div className="offcanvas-header py-2 px-3 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <span className="brand-icon"></span>
            <strong className="brand-text">Uff TV</strong>
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-2">
          <Sidebar onItemClickClose />
        </div>
      </div>
    </div>
  );
}
