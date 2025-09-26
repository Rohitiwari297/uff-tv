import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { baseURl } from "../Api/url";

export default function Popup() {
  const [receiveData, setReceiveData] = useState({
    topic: "livetv",
    channel_id: "livetv",
    sound: "play",
    title: "",
    body: "",
    dataName: "",
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceiveData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const payload = {
        topic: receiveData.topic,
        channel_id: receiveData.channel_id,
        sound: receiveData.sound,
        title: receiveData.title,
        body: receiveData.body,
        data: { name: receiveData.dataName },
      };

      const res = await axios.post(`${baseURl}api/send-notification`, payload);
      setResponse({ success: true, message: res.data.message });
      setReceiveData((prev) => ({
        ...prev,
        title: "",
        body: "",
        dataName: "",
      }));
      alert(res.data.message)
    } catch (err) {
      setResponse({
        success: false,
        message: err.response?.data?.message || "Something went wrong!",
      });
      alert('Something went wrong!')
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-sm rounded-3 border-0">
            <div
              className="card-header text-white text-center"
              style={{ background: "linear-gradient(90deg, #4b6cb7, #182848)", padding: "8px" }}
            >
              <h5 className="mb-0" style={{ fontSize: "1rem" }}>📣 Send Notification</h5>
            </div>

            <div className="card-body p-3">
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: "0.85rem" }}>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={receiveData.title}
                    onChange={handleChange}
                    className="form-control form-control-sm"
                    required
                  />
                </div>

                {/* Body */}
                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: "0.85rem" }}>Body</label>
                  <textarea
                    name="body"
                    value={receiveData.body}
                    onChange={handleChange}
                    className="form-control form-control-sm"
                    rows="3"
                    required
                  ></textarea>
                </div>

                {/* Data Name */}
                <div className="mb-2">
                  <label className="form-label fw-semibold" style={{ fontSize: "0.85rem" }}>Data Name</label>
                  <input
                    type="text"
                    name="dataName"
                    value={receiveData.dataName}
                    onChange={handleChange}
                    className="form-control form-control-sm"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn w-100 text-white fw-semibold"
                  style={{
                    background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
                    padding: "8px",
                    fontSize: "0.9rem",
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Sending...
                    </span>
                  ) : (
                    "Send Notification"
                  )}
                </button>

                {/* Response */}
                {/* {response && (
                  <div
                    className={`alert mt-3 mb-0 py-1 ${response.success ? "alert-success" : "alert-danger"}`}
                    role="alert"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {response.message}
                  </div>
                )} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
