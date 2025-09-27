import { useState, useEffect } from "react";
import { baseURl } from "../Api/url";
import axios from "axios";

export default function Contributions() {
  const [contributors, setContributors] = useState([]);

  // Fetch contributors (GET operation)
  useEffect(() => {
    axios
      .get(`${baseURl}api/feedback/contribution`)
      .then((res) => {
        setContributors(res.data.data || []); // Ensure array
      })
      .catch((err) => console.error(err));
  }, []);

  // Delete contributor
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseURl}api/feedback/contribution/${id}`);
      setContributors((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Style for smaller text and wrapping
  const cellStyle = {
    fontSize: "0.85rem", // reduced font size
    padding: "4px 6px", // tighter spacing
    whiteSpace: "normal",
    wordBreak: "normal",
  };

  return (
    <div className="container mt-2">
      
      <h3 className="text-center fw-bold mb-4">👤Contributions</h3>

      {contributors.length === 0 ? (
        <p className="text-center">No contributions found.</p>
      ) : (
        <div className="table-responsive" style={{ width: "100%" }}>
          <table
            className="table table-striped table-hover shadow-sm"
            style={{ fontSize: "0.5rem" }} // table-wide font size
          >
            <thead className="table-dark">
              <tr
                style={{
                  background:
                    "linear-gradient(90deg, rgb(75, 108, 183), rgb(24, 40, 72))",
                  color: "white",
                }}
              >
                {[
                  "#",
                  "Full Name",
                  "Mobile",
                  "Email",
                  "City",
                  "District",
                  "Message",
                  "Work Link",
                  "Created At",
                  "Actions",
                ].map((header, idx) => (
                  <th
                    key={idx}
                    className="text-white text-center align-middle"
                    style={{ background: "transparent", ...cellStyle }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contributors.map((item, index) => (
                <tr key={item._id}>
                  <td style={cellStyle}>{index + 1}</td>
                  <td style={cellStyle}>{item.fullName}</td>
                  <td style={cellStyle}>{item.mobile}</td>
                  <td style={cellStyle}>{item.email}</td>
                  <td style={cellStyle}>{item.city}</td>
                  <td style={cellStyle}>{item.district}</td>
                  <td style={cellStyle}>{item.message}</td>
                  <td style={cellStyle}>
                    <a
                      href={item.workLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-info"
                      title="View"
                      style={{ fontSize: "0.85rem", padding: "2px 4px" }} // compact button
                    >
                      👁️
                    </a>
                  </td>
                  <td style={cellStyle}>
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td style={cellStyle}>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item._id)}
                      title="Delete"
                      style={{ fontSize: "0.85rem", padding: "2px 4px" }} // compact button
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
