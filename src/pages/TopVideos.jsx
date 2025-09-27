import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURl } from "../Api/url";

export default function TopVideos() {
  const [topVideos, setTopVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseURl}api/admin/analytics/top-videos`)
      .then((res) => {
        setTopVideos(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading top videos...</div>;
  }

  if (topVideos.length === 0) {
    return <div className="text-center p-5 text-muted">No top videos available</div>;
  }

  return (
    <div className="container mt-4" >
      <h3 className="text-center fw-bold mb-4">🔥 Top Videos</h3>
      <div className="row">
        {topVideos.map((video) => (
          <div key={video._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 rounded-2 overflow-hidden hover-shadow">
              {/* Thumbnail */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="card-img-top"
                style={{
                  height: "160px",
                  objectFit: "cover",
                  borderBottom: "1px solid #e0e0e0",
                }}
              />

              {/* Card Body */}
              <div className="card-body p-3">
                <h6 className="card-title fw-bold mb-2" style={{ fontSize: "1rem" }}>
                  {video.title}
                </h6>

                <div style={{ fontSize: "0.9rem" }}>
                  <p className="mb-1">
                    <i className="bi bi-eye-fill text-primary"></i>{" "}
                    <strong>{video.totalViews}</strong> Views
                  </p>

                  <p className="mb-1">
                    <i className="bi bi-clock-history text-warning"></i>{" "}
                    Avg Watched: <strong>{video.avgWatched} sec</strong>
                  </p>

                  <p className="mb-2">
                    <i className="bi bi-graph-up text-success"></i>{" "}
                    Completion: <strong>{video.completionRate}%</strong>
                  </p>

                  {/* Completion progress bar */}
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className={`progress-bar ${
                        video.completionRate >= 70
                          ? "bg-success"
                          : video.completionRate >= 40
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                      role="progressbar"
                      style={{ width: `${video.completionRate}%` }}
                      aria-valuenow={video.completionRate}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
