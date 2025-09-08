export default function Dashboard() {
  return (
    <div className="app-cards">
      <div className="mb-4 mt-2">
        <h5 className="mb-1">Hi, Uff TV 👋</h5>
        <div className="text-muted small">Welcome Back To Your Dashboard</div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6 col-xl-4">
          <div className="app-card d-flex justify-content-between align-items-center">
            <div>
              <div className="text-muted small mb-1">Total Users</div>
              <div className="fs-4 fw-semibold">15,31,876</div>
              <div className="text-danger small mt-1"><i className="bi bi-graph-down-arrow"></i> 1.63% this year</div>
            </div>
            <span className="btn btn-primary rounded-4"><i className="bi bi-person"></i></span>
          </div>
        </div>

         <div className="col-12 col-md-6 col-xl-4">
          <div className="app-card d-flex justify-content-between align-items-center">
            <div>
              <div className="text-muted small mb-1">Total Category</div>
              <div className="fs-4 fw-semibold">35,289</div>
              <div className="text-success small mt-1"><i className="bi bi-graph-up-arrow"></i> 0.75% this year</div>
            </div>
            <span className="btn btn-primary rounded-4"><i className="bi bi-grid"></i></span>
          </div>
        </div>

         <div className="col-12 col-md-6 col-xl-4">
          <div className="app-card d-flex justify-content-between align-items-center">
            <div>
              <div className="text-muted small mb-1">Total Video</div>
              <div className="fs-4 fw-semibold">15,31,876</div>
              <div className="text-danger small mt-1"><i className="bi bi-graph-down-arrow"></i> 1.63% this year</div>
            </div>
            <span className="btn btn-primary rounded-4"><i className="bi bi-camera-video"></i></span>
          </div>
        </div>
      </div>
    </div>
  );
}
