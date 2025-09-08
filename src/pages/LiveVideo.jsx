import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function LiveVideo() {
  const [videos, setVideos] = useState([
    { id: 1, url: "uploads/videos/video-1.mp4" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  //
  const [allVideosList, setAllVideosList] = useState([])

  //api call for videos
  useEffect(()=>{
    axios
      .get('')
  },[])

  // open modal for Add
  const handleAdd = () => {
    setEditingVideo(null);
    setVideoUrl("");
    setShowModal(true);
  };

  // open modal for Edit
  const handleEdit = (video) => {
    setEditingVideo(video);
    setVideoUrl(video.url);
    setShowModal(true);
  };

  // delete row
  const handleDelete = (id) => {
    setVideos(videos.filter((v) => v.id !== id));
  };

  // save (both Add + Edit)
  const handleSave = () => {
    if (videoUrl.trim() === "") return;

    if (editingVideo) {
      // Update existing
      setVideos(
        videos.map((v) =>
          v.id === editingVideo.id ? { ...v, url: videoUrl } : v
        )
      );
    } else {
      // Add new
      setVideos([...videos, { id: videos.length + 1, url: videoUrl }]);
    }

    setShowModal(false);
  };

  return (
    <div className="app-cards">
      {/* Title + Breadcrumb + Add Video Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="mb-1">Live Video</h5>
          <div className="text-muted small"> Dashboard / Live Video</div>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <i className="bi bi-plus me-2"></i>Add Video
        </button>
      </div>

      {/* Table Section */}
      <div className="app-card p-3">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>#</th>
                <th>Url</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.length > 0 ? (
                videos.map((video) => (
                  <tr key={video.id}>
                    <td>{video.id}</td>
                    <td>{video.url}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(video)}
                        className="btn btn-sm btn-primary me-2"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
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
