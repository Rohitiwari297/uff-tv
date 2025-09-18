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
        <h5 className="mb-1">Hi, Uff TV </h5>
        <div className="text-muted small">Welcome Back To Your Dashboard</div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6 col-xl-4">
          <div className="app-card d-flex justify-content-between align-items-center">
            <div>
              <div className="text-muted small mb-1">Total Users</div>
              <div className="fs-4 fw-semibold">{dashboard.userCount}</div>
              {/* <div className="text-danger small mt-1"><i className="bi bi-graph-down-arrow"></i> 1.63% this year</div> */}
            </div>
            <span className="btn btn-primary rounded-4"><i className="bi bi-person"></i></span>
          </div>
        </div>

         <div className="col-12 col-md-6 col-xl-4">
          <div className="app-card d-flex justify-content-between align-items-center">
            <div>
              <div className="text-muted small mb-1">Total Category</div>
              <div className="fs-4 fw-semibold">{dashboard.categoryCount}</div>
              {/* <div className="text-success small mt-1"><i className="bi bi-graph-up-arrow"></i> 0.75% this year</div> */}
            </div>
            <span className="btn btn-primary rounded-4"><i className="bi bi-grid"></i></span>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-4">
          <div className="app-card d-flex justify-content-between align-items-center">
            <div>
              <div className="text-muted small mb-1">Total Video</div>
              <div className="fs-4 fw-semibold">{dashboard.videoCount}</div>
              {/* <div className="text-danger small mt-1"><i className="bi bi-graph-down-arrow"></i> 1.63% this year</div> */}
            </div>
            <span className="btn btn-primary rounded-4"><i className="bi bi-camera-video"></i></span>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-4">
          <div className="app-card d-flex justify-content-between align-items-center">
            <div>
              <div className="text-muted small mb-1">Total Banner</div>
              <div className="fs-4 fw-semibold">{dashboard.bannerCount}</div>
              {/* <div className="text-danger small mt-1"><i className="bi bi-graph-down-arrow"></i> 1.63% this year</div> */}
            </div>
            <span className="btn btn-primary rounded-4"><i className="bi bi-camera-video"></i></span>
          </div>
        </div>
      </div>
    </div>
  );
}
