import axios from "axios";
import { useEffect, useState } from "react";
import {  baseURl } from "../Api/url";

export default function Dashboard() {

  //manage state variable for deshboard
  const [dashboard, setDashboard] = useState([]);

  //get api request
  useEffect(()=> {
    axios
      .get(`${baseURl}api/admin/dashboard-data`)
      .then((res)=>{
          setDashboard(res.data.data)
      })
      .catch((err)=>{
        console.error(err)
      })
  },[])
  console.log(dashboard)

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
            background: "linear-gradient(135deg, #4b6cb7, #182848)",
            color: "white",
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
        <div
          className="app-card d-flex justify-content-between align-items-center p-3 rounded-4 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #36d1dc, #5b86e5)",
            color: "white",
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
      </div>

      {/* Total Video */}
      <div className="col-12 col-md-6 col-xl-4">
        <div
          className="app-card d-flex justify-content-between align-items-center p-3 rounded-4 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #ff9966, #ff5e62)",
            color: "white",
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
      </div>

      {/* Total Banner */}
      <div className="col-12 col-md-6 col-xl-4">
        <div
          className="app-card d-flex justify-content-between align-items-center p-3 rounded-4 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #11998e, #38ef7d)",
            color: "white",
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
      </div>
    </div>
  </div>
);

}
