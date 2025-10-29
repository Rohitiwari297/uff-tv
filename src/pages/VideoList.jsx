import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { baseURl } from "../Api/url";
import { sendNotification } from "../utils/sendNotification";

export default function VideoList() {
  const [allVideosList, setAllVideosList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    video: null,
    thumbnail: null,
    type: "",
    tags: "",
    position: "",
  });

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 10;

  const fetchVideos = () => {
    setLoading(true);
    axios
      .get(`${baseURl}api/videos/`)
      .then((res) => setAllVideosList(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  console.log("All Videos List:", allVideosList);

  useEffect(() => fetchVideos(), []);

  const handleAdd = () => {
    setEditingVideo(null);
    setFormData({
      category: "",
      title: "",
      description: "",
      video: null,
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
      video: video.url || null,
      thumbnail: video.thumbnail || null,
      type: video.type || "",
      tags: video.tags ? video.tags.join(", ") : "",
      position: video.position || "",
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = async () => {
    if (!editingVideo && (!formData.video || !formData.thumbnail)) {
      alert("Please upload both video and thumbnail files.");
      return;
    }

    setSaving(true);
    const fd = new FormData();
    fd.append("category", formData.category);
    fd.append("title", formData.title);
    fd.append("description", formData.description);

    if (formData.video instanceof File) fd.append("video", formData.video);
    if (formData.thumbnail instanceof File) fd.append("thumbnail", formData.thumbnail);

    fd.append("type", formData.type);
    fd.append("tags", formData.tags);
    fd.append("position", formData.position);

    try {
      let res;
      if (editingVideo) {
        res = await axios.put(`${baseURl}api/videos/${editingVideo._id}/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Video updated successfully");
      } else {
        res = await axios.post(`${baseURl}api/videos/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const videoData = res.data.data || res.data;
        alert("Video added successfully");

        // 🔔 Send notification
        if (videoData) {
          await sendNotification({
            title: "New Video Uploaded",
            body: `Video "${videoData.title}" has been uploaded successfully.`,
            dataName: videoData._id || videoData.id,
            image: videoData.thumbnail,
            videoId: videoData._id || videoData.id,
            type: videoData.type,
          });
        }
      }

      fetchVideos();
      setShowModal(false);
    } catch (err) {
      console.error("Error saving video:", err.response?.data || err.message);
      alert(`Something went wrong: ${err.response?.data?.message || err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    console.log("Deleting video with ID:", id);

    setLoading(true);
    axios
      .delete(`${baseURl}api/videos/${id}`)
      .then(() => {
        alert("Video deleted successfully");
        fetchVideos();
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if ((name === "thumbnail" || name === "video") && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseURl}api/category/`)
      .then((res) => setCategoryList(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Pagination logic
  const filteredVideos = allVideosList.filter((video) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (video.category?.name || "").toLowerCase().includes(term) ||
      (video.title || "").toLowerCase().includes(term) ||
      (video.description || "").toLowerCase().includes(term) ||
      (video.type || "").toLowerCase().includes(term) ||
      (video.tags?.join(", ") || "").toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = filteredVideos.slice(startIndex, startIndex + videosPerPage);

  return (
    <div className="app-cards draggable-cards-container">
      {/* Title + Add Video */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold text-primary mb-1">Video List</h4>
          <div className="text-muted small">Dashboard / Videos</div>
        </div>
        <button className="btn btn-primary shadow-sm" onClick={handleAdd}>
          <i className="bi bi-plus me-2"></i>Add Video
        </button>
      </div>

      {/* Table Section */}
      <div className="app-card p-3 shadow-sm rounded">
        <div className="d-flex mb-3" style={{ gap: "10px", width: "100%" }}>
          <input
            type="text"
            className="form-control w-full"
            placeholder="Search Caregory, Title, Description, Type, Tags..."
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: "50px", padding: "0.5rem 0.75rem" }}
          />
        </div>

        {loading ? (
          <div className="text-center p-3">Loading...</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle bordered table-bordered mb-0 ">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "auto" }}>#</th>
                  <th>Category</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Video</th>
                  <th>Thumbnail</th>
                  <th>Type</th>
                  <th>Tags</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentVideos.length > 0 ? (
                  currentVideos.map((video, idx) => (
                    <tr key={video.position }>
                      {/* Continuous index */}
                      <td>{video.position}</td>
                      <td>{video.category?.name || "N/A"}</td>
                      <td className="fw-semibold">{video.title || "Untitled"}</td>
                      <td>{video.description || "No description"}</td>
                      <td>
                        {video.url ? (
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary "
                            style={{ fontSize: "0.75rem", width: "fit-content" }}
                          >
                            View
                          </a>
                        ) : (
                          "No URL"
                        )}
                      </td>
                      <td>
                        <img
                          src={video.thumbnail || ""}
                          alt={video.title || "thumbnail"}
                          className="rounded border"
                          style={{ width: "120px", height: "45px", objectFit: "cover" }}
                        />
                      </td>
                      <td>{video.type || "N/A"}</td>
                      <td>{video.tags?.length > 0 ? video.tags.join(", ") : "N/A"}</td>
                      <td>
                        <div className="d-flex">
                          <button
                            onClick={() => handleEdit(video)}
                            className="btn btn-sm btn-primary me-2"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(video._id || video.id)}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage((p) => p - 1)}>
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  >
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage((p) => p + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingVideo ? "Edit Video" : "Add Video"}</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                {saving ? (
                  <div className="text-center p-3">Saving...</div>
                ) : (
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Video Category</label>
                      <select
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Select Category</option>
                        {categoryList.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
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
                      <label className="form-label">Video (File) </label>
                      <input
                        type="file"
                        name="video"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Thumbnail (File)</label>
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
                    <div className="mb-3">
                      <label className="form-label">Position</label>
                      <input
                        type="number"
                        name="position"
                        className="form-control"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="e.g. 1"  
                      />
                    </div>
                  </form>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClose}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={saving}
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

