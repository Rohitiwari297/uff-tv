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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="mb-1">Users List</h5>
          <div className="text-muted small"> Dashboard / Users</div>
        </div>
      </div>

      {/* Table Section */}
      <div className="app-card p-3">
        <div className="d-lg-flex justify-content-between align-items-center mb-3">
          {/* <div className="d-flex align-items-center mb-lg-0 mb-3">
            <label className="me-2">Show</label>
            <select
              className="form-select form-select-sm"
              style={{ width: "70px" }}
            >
              <option >10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <label className="ms-2">entries</label>
          </div> */}
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="text-center ">
            Loading...
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>#</th>
                  <th>Image</th>
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
                      
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="user-info">
                            <img
                              src={`${baseURl}${data.image}`}
                              alt="avatar"
                              className="avatar"
                            />
                          </div>
                        </td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
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
                    <td colSpan="6" className="text-center text-muted">
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
