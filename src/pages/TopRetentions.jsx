import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { baseURl } from "../Api/url";

export default function VideoAnalytics() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch videos
  useEffect(() => {
    axios
      .get(`${baseURl}api/admin/analytics/retention`)
      .then((res) => {
        setVideos(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  const filteredVideos = videos.filter((video) =>
    video.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredVideos.length === 0) {
    return <div className="text-center p-5">No videos found.</div>;
  }

  // Badge color based on retention %
  const getBadgeColor = (percent) => {
    if (percent >= 70) return "success";
    if (percent >= 40) return "warning";
    return "danger";
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center fw-bold mb-4">🎬 Video Analytics Dashboard</h3>

      {/* Search */}
      {/* <div className="mb-4 d-flex justify-content-end">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}

      {/* Table Layout */}
      <div className="table-responsive mb-5">
  <table className="table table-striped table-hover align-middle">
    <thead>
      <tr
        style={{
          background: "linear-gradient(90deg, rgb(75, 108, 183), rgb(24, 40, 72))",
          color: "white"
        }}
      >
        <th className="text-white" style={{ background: "transparent" }}>#</th>
        <th className="text-white" style={{ background: "transparent" }}>Title</th>
        <th className="text-white" style={{ background: "transparent" }}>Avg Watched Seconds</th>
        <th className="text-white" style={{ background: "transparent" }}>Retention %</th>
        <th className="text-white" style={{ background: "transparent" }}>Video ID</th>
      </tr>
    </thead>
    <tbody>
      {filteredVideos.map((video, idx) => (
        <tr key={video._id}>
          <td>{idx + 1}</td>
          <td>{video.title || "Untitled"}</td>
          <td>{video.avgWatchedSeconds || 0}</td>
          <td>
            <span
              className={`badge bg-${getBadgeColor(video.retentionPercent)}`}
            >
              {video.retentionPercent || 0}%
            </span>
          </td>
          <td>{video.videoId}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Card Layout */}
      <div className="row">
        {filteredVideos.map((video) => (
          <div key={video._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 border-primary">
              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
                <p className="card-text mb-1">
                  <strong>Avg Watched Seconds:</strong>{" "}
                  <span className="text-primary">{video.avgWatchedSeconds}</span>
                </p>
                <p className="card-text mb-2">
                  <strong>Retention %:</strong>{" "}
                  <span
                    className={`badge bg-${getBadgeColor(video.retentionPercent)}`}
                  >
                    {video.retentionPercent}%
                  </span>
                </p>

                <div className="progress mb-2" style={{ height: "10px" }}>
                  <div
                    className={`progress-bar bg-${getBadgeColor(
                      video.retentionPercent
                    )}`}
                    role="progressbar"
                    style={{ width: `${video.retentionPercent}%` }}
                    aria-valuenow={video.retentionPercent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>

                <p className="card-text">
                  <strong>Video ID:</strong>{" "}
                  <span className="text-muted">{video.videoId}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 