import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURl } from "../Api/url";

export default function UsersList() {
  // state variable
  const [userApi, setUserApi] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    setLoading(true); // start loading
    axios
      .get(`${baseURl}api/users/`)
      .then((res) => {
        console.log("API response:", res.data);
        setUserApi(res.data.data || []); // ensure array
        setLoading(false); // stop loading
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // stop loading even if error
      });
  }, []);

  return (
    <div className="app-cards">
      {/* Title + Breadcrumb + Add User Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1 text-primary">Users List</h4>
          <div className="text-muted small">Dashboard / Users</div>
        </div>
      </div>

      {/* Table Section */}
      <div className="app-card p-4 shadow-sm rounded-3 bg-white">
        <div className=" mb-3">
          <div className="position-relative" style={{ maxWidth: "100%" }}>
            <input
              type="text"
              className="form-control ps-5"
              placeholder="🔍 Search users..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              style={{
                borderRadius: "50px",
                padding: "0.6rem 1rem",
                fontSize: "14px",
                width: "100%",
              }}
            />
          </div>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Loading users...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle table-bordered">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "50px" }}>#</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  {/* <th style={{ width: "120px" }}>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {userApi.length > 0 ? (
                  userApi
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(search);
                    })
                    .map((data, index) => (
                      <tr key={index} className="align-middle">
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={`${baseURl}${data.avatar}`}
                              alt="avatar"
                              className="rounded-circle me-2"
                              style={{
                                width: "45px",
                                height: "45px",
                                objectFit: "cover",
                                border: "2px solid #f0f0f0",
                              }}
                            />
                          </div>
                        </td>
                        <td className="fw-semibold">{data.name}</td>
                        <td>
                          <span className="text-muted small">{data.email}</span>
                        </td>
                        <td>{data.mobile}</td>
                        {/* <td>
                          <button className="btn btn-sm btn-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </td> */}
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {/* {!loading && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              Showing {userApi.length > 0 ? 1 : 0} to {userApi.length} of{" "}
              {userApi.length} entries
            </div>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled">
                  <span className="page-link">Previous</span>
                </li>
                <li className="page-item active">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item">
                  <span className="page-link">2</span>
                </li>
                <li className="page-item">
                  <span className="page-link">Next</span>
                </li>
              </ul>
            </nav>
          </div>
        )} */}
      </div>
    </div>
  );
}
