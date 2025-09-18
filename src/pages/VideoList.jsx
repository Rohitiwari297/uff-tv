
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { baseURl } from "../Api/url";

export default function VideoList() {
  const [allVideosList, setAllVideosList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  // api call for videos
  const fetchVideos = () => {
    setLoading(true);
    axios
      .get(`${baseURl}api/videos/`)
      .then((res) => {
        setAllVideosList(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    url: "",
    thumbnail: null,
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
      thumbnail: null,
      type: "",
      tags: "",
    });
    setShowModal(true);
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      category: video.category?._id || video.category || "",
      title: video.title || "",
      description: video.description || "",
      url: video.url || "",
      thumbnail: null, // user can re-upload
      type: video.type || "",
      tags: video.tags ? video.tags.join(", ") : "",
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = () => {
    const fd = new FormData();
    fd.append("category", formData.category);
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("url", formData.url);
    if (formData.thumbnail) fd.append("thumbnail", formData.thumbnail);
    fd.append("type", formData.type);
    fd.append("tags", formData.tags);

    if (editingVideo) {
      // Update existing video
      axios
        .put(`${baseURl}api/videos/${editingVideo._id}/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          alert("Video updated successfully");
          fetchVideos();
          setShowModal(false);
        })
        .catch((err) => console.error("Error updating video:", err));
    } else {
      // ✅ Add new video with FormData
      axios
        .post(`${baseURl}api/videos/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          alert("Video added successfully");
          fetchVideos();
          setShowModal(false);
        })
        .catch((err) => console.error("Error adding video:", err));
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    console.log(id)

    axios
      .delete(`${baseURl}api/videos/${id}`)
      .then(() => {
        alert("Video deleted successfully");
        fetchVideos();
      })
      .catch((err) => console.error("Error deleting video:", err));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail" && files.length > 0) {
      setFormData({ ...formData, thumbnail: files[0] });
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
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
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
                {allVideosList.length > 0 ? (
                  allVideosList
                    .filter((video) =>
                      searchTerm === ""
                        ? video
                        : video.title
                            ?.toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    )
                    .map((video, idx) => (
                      <tr key={video._id || idx}>
                        <td>{idx + 1}</td>
                        <td>{video.category?.name || "N/A"}</td>
                        <td>{video.title || "Untitled"}</td>
                        <td>{video.description || "No description"}</td>
                        <td>
                          {video.url ? (
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              MP4
                            </a>
                          ) : (
                            "No URL"
                          )}
                        </td>
                        <td>
                          <img
                            src={
                              video.thumbnail
                                ? `${baseURl}${video.thumbnail}`
                                : "https://via.placeholder.com/40"
                            }
                            alt={video.title || "thumbnail"}
                            className="avatar rounded"
                            width="40"
                          />
                        </td>
                        <td>{video.type || "N/A"}</td>
                        <td>
                          {video.tags?.length > 0
                            ? video.tags.join(", ")
                            : "N/A"}
                        </td>
                        <td>
                          <div className="d-flex">
                            <button
                              onClick={() => handleEdit(video)}
                              className="btn btn-sm btn-primary me-2"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button
                              onClick={() => handleDelete(video._id || video.id )}
                              className="btn btn-sm btn-danger"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">
                      No videos found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
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
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Video Category</label>
                    <input
                      type="text"
                      name="category"
                      className="form-control"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Enter category ID or name"
                    />
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
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClose}
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
