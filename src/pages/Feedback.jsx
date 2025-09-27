import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { baseURl } from "../Api/url"; // replace with your API base URL

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURl}api/feedback`);
      setFeedbacks(res.data.data || []);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or Update feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await axios.put(`${baseURl}api/feedback/${editingId}`, formData);
        alert("Feedback updated successfully!");
      } else {
        // Create
        await axios.post(`${baseURl}api/feedback`, formData);
        alert("Feedback added successfully!");
      }
      setFormData({ subject: "", description: "" });
      setEditingId(null);
      fetchFeedbacks();
    } catch (err) {
      console.error("Error saving feedback:", err);
      alert("Failed to save feedback!");
    }
  };

  // Edit feedback
  const handleEdit = (feedback) => {
    setFormData({
      subject: feedback.subject,
      description: feedback.description,
    });
    setEditingId(feedback._id);
  };

  // Delete feedback
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await axios.delete(`${baseURl}api/feedback/${id}`);
      alert("Feedback deleted successfully!");
      fetchFeedbacks();
    } catch (err) {
      console.error("Error deleting feedback:", err);
      alert("Failed to delete feedback!");
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center fw-bold mb-4">📋 Manage Feedbacks</h4>

      {/* Form */}
      {/* <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
                required
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
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {editingId ? "Update Feedback" : "Add Feedback"}
            </button>
          </form>
        </div>
      </div> */}

      {/* Feedback List */}
      {loading ? (
        <p className="text-center">Loading feedbacks...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr style={{
                  background:
                    "linear-gradient(90deg, rgb(75, 108, 183), rgb(24, 40, 72))",
                  color: "white",
                }}>
                <th className="text-white" style={{ background: "transparent" }}>#</th>
                <th className="text-white" style={{ background: "transparent" }} >User</th>
                <th className="text-white" style={{ background: "transparent" }} >Email</th>
                <th className="text-white" style={{ background: "transparent" }} >Subject</th>
                <th className="text-white" style={{ background: "transparent" }} >Description</th>
                <th className="text-white" style={{ background: "transparent" }} >Created At</th>
                <th className="text-white" style={{ background: "transparent" }} >Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No feedbacks available
                  </td>
                </tr>
              ) : (
                feedbacks.map((fb, idx) => (
                    // console.log(fb),
                  <tr key={fb._id}>
                    <td>{idx + 1}</td>
                    <td>{fb.userId?.name}</td>
                    <td>{fb.userId?.email}</td>
                    <td>{fb.subject}</td>
                    <td>{fb.description.slice(0, 50)}...</td>
                    <td>{new Date(fb.createdAt).toLocaleString()}</td>
                    <td className=" ">

                      {/* <button
                        className="btn btn-sm btn-warning me-2 mb-1"
                        onClick={() => handleEdit(fb)}
                      >
                        ✏️ 
                      </button> */}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(fb._id)}
                      >
                        🗑 
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
