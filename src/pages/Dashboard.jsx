import axios from "axios";
import { useEffect, useState } from "react";
import { baseURl } from "../Api/url";
import { Link } from "react-router-dom";

export default function Dashboard() {
  //manage state variable for dashboard
  const [dashboard, setDashboard] = useState([]);

  //get api request
  useEffect(() => {
    axios
      .get(`${baseURl}api/admin/dashboard-data`)
      .then((res) => {
        setDashboard(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log(dashboard);

  // gradient colors for each card
  const gradients = [
    "linear-gradient(135deg, #4b6cb7, #182848)", // users
    "linear-gradient(135deg, #36d1dc, #5b86e5)", // category
    "linear-gradient(135deg, #ff9966, #ff5e62)", // video
    "linear-gradient(135deg, #11998e, #38ef7d)", // banner
    "linear-gradient(135deg, #f7971e, #ffd200)", // top videos
    "linear-gradient(135deg, #00c6ff, #0072ff)", // top retention
    "linear-gradient(135deg, #7f00ff, #e100ff)", // notifications
    "linear-gradient(135deg, #fc4a1a, #f7b733)", // feedbacks
    "linear-gradient(135deg, #43cea2, #185a9d)", // contributions
  ];

  return (
    <div className="app-cards">
      <div className="mb-4 mt-2">
        <h5
          className="mb-1 fw-bold"
          style={{
            background: "linear-gradient(90deg, #4b6cb7, #182848)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "1.5rem",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Hi, Simhasth 👋
        </h5>
        <div
          className="small"
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "0.9rem",
            color: "#6c757d",
            letterSpacing: "0.5px",
          }}
        >
          Welcome back to your dashboard
        </div>
      </div>

      <div className="row g-3">
        {/* Total Users */}
        <div className="col-12 col-md-6 col-xl-4">
          <div
            className="app-card d-flex justify-content-between align-items-center p-3 rounded-4 shadow-sm"
            style={{
              background: gradients[0],
              color: "white",
              minHeight: "130px",
            }}
          >
            <div>
              <div className="small mb-1 opacity-75">Total Users</div>
              <div className="fs-3 fw-bold">{dashboard.userCount}</div>
            </div>
            <span
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              <i className="bi bi-person"></i>
            </span>
          </div>
        </div>

        {/* Total Category */}
        <div className="col-12 col-md-6 col-xl-4">

          <Link to="/category" className="text-decoration-none">
          <div
            className="app-card d-flex justify-content-between align-items-center p-3 rounded-4 shadow-sm"
            style={{
              background: gradients[1],
              color: "white",
              minHeight: "130px",
            }}
          >
            <div>
              <div className="small mb-1 opacity-75">Total Category</div>
              <div className="fs-3 fw-bold">{dashboard.categoryCount}</div>
            </div>
            <span
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              <i className="bi bi-grid"></i>
            </span>
          </div>
          </Link>
        </div>

        {/* Total Video */}
        <div className="col-12 col-md-6 col-xl-4">
          <Link to="/video" className="text-decoration-none">
          <div
            className="app-card d-flex justify-content-between align-items-center p-3 rounded-4 shadow-sm"
            style={{
              background: gradients[2],
              color: "white",
              minHeight: "130px",
            }}
          >
            <div>
              <div className="small mb-1 opacity-75">Total Video</div>
              <div className="fs-3 fw-bold">{dashboard.videoCount}</div>
            </div>
            <span
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              <i className="bi bi-camera-video"></i>
            </span>
          </div>
          </Link>
        </div>

        {/* Total Banner */}
        <div className="col-12 col-md-6 col-xl-4">
          <Link to="/banner" className="text-decoration-none">
          <div
            className="app-card d-flex justify-content-between align-items-center p-3 rounded-4 shadow-sm"
            style={{
              background: gradients[3],
              color: "white",
              minHeight: "130px",
            }}
          >
            <div>
              <div className="small mb-1 opacity-75">Total Banner</div>
              <div className="fs-3 fw-bold">{dashboard.bannerCount}</div>
            </div>
            <span
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              <i className="bi bi-image"></i>
            </span>
          </div>
          </Link>
        </div>

        {/* Top Videos */}
        <div className="col-12 col-md-6 col-xl-4">
          <Link to="/topVideos" className="text-decoration-none">
          <div
            className="app-card d-flex justify-content-between align-items-center p-3 rounded-4 shadow-sm"
            style={{
              background: gradients[4],
              color: "white",
              minHeight: "130px",
            }}
          >
            <div>
              <div className="small mb-1 opacity-75">Top Videos</div>
              <div className="fs-3 fw-bold">{dashboard.topVideosCount}</div>
            </div>
            <span
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              <i className="bi bi-play-btn"></i>
            </span>
          </div>
          </Link>
        </div>

        {/* Top Retentions */}
        <div className="col-12 col-md-6 col-xl-4">
          <Link to="/topRetentions" className="text-decoration-none">
          <div
            className="app-card d-flex justify-content-between align-items-center p-3 rounded-4 shadow-sm"
            style={{
              background: gradients[5],
              color: "white",
              minHeight: "130px",
            }}
          >
            <div>
              <div className="small mb-1 opacity-75">Top Retentions</div>
              <div className="fs-3 fw-bold">{dashboard.topRetentionsCount}</div>
            </div>
            <span
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              <i className="bi bi-bar-chart"></i>
            </span>
          </div>
          </Link>
        </div>

        {/* Notifications */}
        <div className="col-12 col-md-6 col-xl-4">
          <Link to="/pop-up" className="text-decoration-none">
          <div
            className="app-card d-flex justify-content-between align-items-center p-3 rounded-4 shadow-sm"
            style={{
              background: gradients[6],
              color: "white",
              minHeight: "130px",
            }}
          >
            <div>
              <div className="small mb-1 opacity-75">Notifications</div>
              <div className="fs-3 fw-bold">{dashboard.notificationsCount}</div>
            </div>
            <span
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              <i className="bi bi-bell"></i>
            </span>
          </div>
          </Link>
        </div>

        {/* Feedbacks */}
        <div className="col-12 col-md-6 col-xl-4">
          <Link to="/feedback" className="text-decoration-none">
          <div
            className="app-card d-flex justify-content-between align-items-center p-3 rounded-4 shadow-sm"
            style={{
              background: gradients[7],
              color: "white",
              minHeight: "130px",
            }}
          >
            <div>
              <div className="small mb-1 opacity-75">Feedbacks</div>
              <div className="fs-3 fw-bold">{dashboard.feedbackCount}</div>
            </div>
            <span
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              <i className="bi bi-chat-left-text"></i>
            </span>
          </div>
          </Link>
        </div>

        {/* Contributions */}
        <div className="col-12 col-md-6 col-xl-4">
          <Link to="/contributions" className="text-decoration-none">
          <div
            className="app-card d-flex justify-content-between align-items-center p-3 rounded-4 shadow-sm"
            style={{
              background: gradients[8],
              color: "white",
              minHeight: "130px",
            }}
          >
            <div>
              <div className="small mb-1 opacity-75">Contributions</div>
              <div className="fs-3 fw-bold">{dashboard.contributionsCount}</div>
            </div>
            <span
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255,255,255,0.15)",
                color: "white",
                fontSize: "1.2rem",
              }}
            >
              <i className="bi bi-people"></i>
            </span>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
