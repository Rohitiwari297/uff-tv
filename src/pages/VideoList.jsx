import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function VideoList() {
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [videos, setVideos] = useState([
    {
      id: 1,
      category: "Movies",
      title: "Movie 1",
      description: "Some description",
      url: "uploads/videos/video-1.mp4",
      thumbnail: "https://via.placeholder.com/40",
      type: "long_form",
      tags: "trending, recent",
    },
    {
      id: 2,
      category: "Sports",
      title: "Match Highlights",
      description: "Exciting highlights",
      url: "uploads/videos/video-2.mp4",
      thumbnail: "https://via.placeholder.com/40",
      type: "short_form",
      tags: "sports, trending",
    },
  ]);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    url: "",
    thumbnail: "",
    type: "",
    tags: "",
  });

  const handleAdd = () => {
    setEditingVideo(null);
    setFormData({
      category: "",
      title: "",
      description: "",
      url: "",
      thumbnail: "",
      type: "",
      tags: "",
    });
    setShowModal(true);
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData(video);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = () => {
    if (editingVideo) {
      setVideos(videos.map((v) => (v.id === editingVideo.id ? { ...formData, id: v.id } : v)));
    } else {
      setVideos([...videos, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setVideos(videos.filter((v) => v.id !== id));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail" && files.length > 0) {
      setFormData({ ...formData, thumbnail: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="app-cards">
      {/* Title + Breadcrumb + Add Video Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="mb-1">Video List</h5>
          <div className="text-muted small"> Dashboard / Video</div>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <i className="bi bi-plus me-2"></i>Add Video
        </button>
      </div>

      {/* Table Section */}
      <div className="app-card p-3">
        <div className="d-lg-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center mb-lg-0 mb-3">
            <label className="me-2">Show</label>
            <select className="form-select form-select-sm" style={{ width: "70px" }}>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <label className="ms-2">entries</label>
          </div>
          <div>
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
        </div>

        {/* Video Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Title</th>
                <th>Description</th>
                <th>Url</th>
                <th>Thumbnail</th>
                <th>Type</th>
                <th>Tags</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video, idx) => (
                <tr key={video.id}>
                  <td>{idx + 1}</td>
                  <td>{video.category}</td>
                  <td>{video.title}</td>
                  <td>{video.description}</td>
                  <td>{video.url}</td>
                  <td>
                    <img src={video.thumbnail} alt="thumb" className="avatar rounded" width="40" />
                  </td>
                  <td>{video.type}</td>
                  <td>{video.tags}</td>
                  <td>
                    <div className="d-flex">
                      <button
                        onClick={() => handleEdit(video)}
                        className="btn btn-sm btn-primary btn-primary-light me-2"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>Showing 1 to {videos.length} of {videos.length} entries</div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled">
                <span className="page-link">Previous</span>
              </li>
              <li className="page-item active">
                <span className="page-link">1</span>
              </li>
              <li className="page-item">
                <span className="page-link">Next</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingVideo ? "Edit Video" : "Add Video"}
                </h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      name="category"
                      className="form-select"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      <option value="Movies">Movies</option>
                      <option value="Sports">Sports</option>
                      <option value="Music">Music</option>
                      <option value="News">News</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Video URL</label>
                    <input
                      type="text"
                      name="url"
                      className="form-control"
                      value={formData.url}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Thumbnail</label>
                    <input
                      type="file"
                      name="thumbnail"
                      className="form-control"
                      onChange={handleChange}
                    />
                    {formData.thumbnail && (
                      <img
                        src={formData.thumbnail}
                        alt="preview"
                        className="mt-2 rounded"
                        width="80"
                      />
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Type</label>
                    <select
                      name="type"
                      className="form-select"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="">Select Type</option>
                      <option value="long_form">Long Form</option>
                      <option value="short_form">Short Form</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      className="form-control"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="e.g. trending, recent"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleClose}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSave}>
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
