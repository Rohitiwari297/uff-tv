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
  });

  const fetchVideos = () => {
    setLoading(true);
    axios
      .get(`${baseURl}api/videos/`)
      .then((res) => setAllVideosList(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

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

  try {
    let res;
    if (editingVideo) {
      res = await axios.put(`${baseURl}api/videos/${editingVideo._id}/`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Video updated successfully");

      // //  Send notification after update
      // const videoData = res.data.data || res.data;
      // if (videoData) {
      //   const notifRes = await sendNotification({
      //     title: "Video Updated",
      //     body: `Video "${formData.title}" has been updated successfully.`,
      //     dataName: formData.title,
      //     image: videoData.thumbnail,
      //     videoId: videoData._id || videoData.id,
      //   });
      //   console.log("Notification result:", notifRes);
      // }
    } else {
      res = await axios.post(`${baseURl}api/videos/`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Full API response:", res.data);

      const videoData = res.data.data || res.data;
      console.log("Extracted video data:", videoData);

      alert("Video added successfully");

      // Send notification after new upload
      if (videoData) {
        const notifRes = await sendNotification({
          title: "New Video Uploaded",
          body: `Video "${videoData.title}" has been uploaded successfully.`,
          dataName: videoData._id || videoData.id,
          image: videoData.thumbnail,
          videoId: videoData._id || videoData.id,
          type: videoData.type,
        });
        console.log("Notification result:", notifRes);
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

  return (
    <div className="app-cards">
      {/* Title + Add Video */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="mb-1">Video List</h5>
          <div className="text-muted small">Dashboard / Video</div>
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
                  <th>Video</th>
                  <th>Thumbnail</th>
                  <th>Type</th>
                  <th>Tags</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allVideosList.length > 0 ? (
                  allVideosList
                    .filter((video) => {
                      if (!searchTerm) return true;
                      const term = searchTerm.toLowerCase();
                      return (
                        (video.category?.name || "").toLowerCase().includes(term) ||
                        (video.title || "").toLowerCase().includes(term) ||
                        (video.description || "").toLowerCase().includes(term) ||
                        (video.type || "").toLowerCase().includes(term) ||
                        (video.tags?.join(", ") || "").toLowerCase().includes(term)
                      );
                    })
                    .map((video, idx) => (
                      <tr key={video._id || idx}>
                        <td>{idx + 1}</td>
                        <td>{video.category?.name || "N/A"}</td>
                        <td>{video.title || "Untitled"}</td>
                        <td>{video.description || "No description"}</td>
                        <td>
                          {video.url ? (
                            <a href={video.url} target="_blank" rel="noopener noreferrer">
                              MP4
                            </a>
                          ) : (
                            "No URL"
                          )}
                        </td>
                        <td>
                          <img
                            src={video.thumbnail || ""}
                            alt={video.title || "thumbnail"}
                            className="avatar rounded"
                            width="40"
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
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
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
                      <label className="form-label">Video (File) *</label>
                      <input
                        type="file"
                        name="video"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Thumbnail (File) *</label>
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
