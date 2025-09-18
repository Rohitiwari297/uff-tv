import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { baseURl } from "../Api/url";
import Hls from "hls.js";

export default function LiveVideo() {
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [liveVideos, setLiveVideos] = useState([]);
  const [liveRunVideo, setLiveRunVideo] = useState("");
  const [changeURL, setChangeURL] = useState("");
  const [urlReceived, setUrlReceived] = useState("");
  const [isOn, setIsOn] = useState(false); // override state from backend

  const videoRef = useRef(null);

  // ✅ Always a string for video source
  const videoSrc =
    isOn && urlReceived
      ? String(urlReceived)
      : liveRunVideo
      ? String(liveRunVideo)
      : "";

  // ✅ Fetch scheduled slots
  useEffect(() => {
    axios
      .get(`${baseURl}api/live-stream/schedule/slots`)
      .then((res) => setLiveVideos(res.data.data))
      .catch(console.error);
  }, []);

  // ✅ Fetch current live stream info
  const fetchLiveData = () => {
    axios
      .get(`${baseURl}api/live-stream/schedule/live`)
      .then((res) => {
        if (res.data?.data?.url) setLiveRunVideo(res.data.data.url);
        if (typeof res.data?.data?.override === "boolean")
          setIsOn(res.data.data.override);
        if (res.data?.data?.url && res.data?.data?.override) {
          setUrlReceived(res.data.data.url);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchLiveData();
  }, []);

  // ✅ Re-fetch when ON/OFF changes
  useEffect(() => {
    fetchLiveData();
  }, [isOn]);

  // ✅ Handle HLS / MP4
  useEffect(() => {
    if (!videoSrc) return;
    const video = videoRef.current;

    if (Hls.isSupported() && videoSrc.endsWith(".m3u8")) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else {
      video.src = videoSrc;
    }
  }, [videoSrc]);

  // Add modal
  const handleAdd = () => {
    setEditingVideo(null);
    setVideoUrl("");
    setStartTime("");
    setEndTime("");
    setShowModal(true);
  };

  // Edit modal
  const handleEdit = (video) => {
    axios
      .get(`${baseURl}api/videos/${video.id || video._id}`)
      .then((res) => {
        const data = res.data?.data || video;
        setEditingVideo(data);
        setVideoUrl(data.url);
        setStartTime(data.startTime || "");
        setEndTime(data.endTime || "");
        setShowModal(true);
      })
      .catch(() => {
        setEditingVideo(video);
        setVideoUrl(video.url);
        setStartTime(video.startTime || "");
        setEndTime(video.endTime || "");
        setShowModal(true);
      });
  };

  // Delete video
  const handleDelete = (id) => {
    axios
      .delete(`${baseURl}api/live-stream/schedule/slot`, { data: { slotId: id } })
      .then((res) => {
        alert(res.data.message);
        setLiveVideos((prev) =>
          prev.filter((vid) => vid.id !== id && vid._id !== id)
        );
      })
      .catch((err) =>
        console.error("Delete failed:", err.response?.data || err.message)
      );
  };

  // Save/Add/Edit video
  const handleSave = () => {
    if (!startTime || !endTime || !videoUrl) {
      alert("All fields are required");
      return;
    }

    if (editingVideo) {
      axios
        .put(
          `${baseURl}api/live-stream/schedule/slot/${
            editingVideo.id || editingVideo._id
          }`,
          { url: videoUrl, startTime, endTime },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          alert("Video updated successfully");
          setLiveVideos((prev) =>
            prev.map((vid) =>
              vid.id === (editingVideo.id || editingVideo._id) ||
              vid._id === (editingVideo.id || editingVideo._id)
                ? res.data.data
                : vid
            )
          );
          setShowModal(false);
          setEditingVideo(null);
        })
        .catch((err) => console.error("Error updating video:", err));
    } else {
      axios
        .post(
          `${baseURl}api/live-stream/schedule/add`,
          { url: videoUrl, startTime, endTime },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          alert("URL added successfully");
          setLiveVideos((prev) => [...prev, res.data.data]);
          setShowModal(false);
        })
        .catch((err) => console.error("Error adding video:", err));
    }
  };

  // ✅ Change live URL and update instantly
  const urlHandler = () => {
    if (!changeURL) {
      alert("URL is mandatory");
      return;
    }

    axios
      .post(
        `${baseURl}api/live-stream/schedule/live`,
        { url: changeURL, enabled: true, override: true },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        // ✅ Update state instantly
        setIsOn(true);
        setUrlReceived(changeURL);

        alert("URL added successfully");
        setChangeURL("");
      })
      .catch(console.error);
  };

  // Toggle override
  const toggleOverride = () => {
    const newOverride = !isOn;
    axios
      .post(
        `${baseURl}api/live-stream/schedule/live`,
        { override: newOverride, url: urlReceived || liveRunVideo, enabled: true },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        setIsOn(newOverride);
        fetchLiveData(); // ✅ refresh latest data
      })
      .catch((err) => console.error("Failed to update override:", err));
  };

  return (
    <div className="app-cards">
      <div className="text-muted small text-center">Dashboard / Live Video</div>

      <div className="row mb-3">
        <div className="flex col-lg-6 align-content-center">
          <button
            onClick={toggleOverride}
            className={`px-2 py-2 rounded text-white ${
              isOn ? "bg-success" : "bg-danger"
            } `}
            style={{ fontSize: "0.45rem" }}
          >
            {isOn ? "ON" : "OFF"}
          </button>
          <h5 className="mb-1">Live Video</h5>
          <div className="position-relative d-inline-block">
            <span
              className="bg-danger text-white position-absolute top-0 start-0 mt-2 ml-2 px-1 py-0 rounded d-flex align-items-center gap-1"
              style={{ fontSize: "0.40rem" }}
            >
              Live <span className="dot bg-white"></span>
            </span>

            <video
              ref={videoRef}
              controls
              autoPlay
              muted
              style={{ width: "250px", height: "150px", borderRadius: "10px" }}
            />
          </div>

          <p className="small text-muted mt-1">
            Now Playing: {isOn ? "Custom Live URL" : "Scheduled Video"}
          </p>
        </div>

        <div className="col-lg-6 align-content-center">
          <div className="text-center">
            <input
              className="form-control w-100"
              placeholder="Paste your URL"
              type="text"
              value={changeURL}
              onChange={(e) => setChangeURL(e.target.value)}
            />
            <button onClick={urlHandler} className="btn btn-primary mt-2 w-50">
              Change Live URL
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className="app-card p-3"
        style={{ maxHeight: "300px", overflow: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-1">Scheduled Videos</h5>
          <button className="btn btn-primary" onClick={handleAdd}>
            <i className="bi bi-plus me-2"></i>Add Video
          </button>
        </div>
        <div className="table-responsive border-top border-2">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>#</th>
                <th>Url</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {liveVideos.length > 0 ? (
                liveVideos.map((video, index) => (
                  <tr key={video.id || video._id}>
                    <td>{index + 1}</td>
                    <td>{video.url}</td>
                    <td>{video.startTime}</td>
                    <td>{video.endTime}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(video)}
                        className="btn btn-sm btn-primary me-2"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(video.id || video._id)}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No videos found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingVideo ? "Edit Video" : "Add Video"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Video URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter video URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                  <label className="form-label">Start Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <label className="form-label">End Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  {editingVideo ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
