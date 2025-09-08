

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function CategoryList() {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  //
  const [category, seCategory] = useState([])

  //api call
  useEffect(()=>{
    axios
    .get("https://livetv.quickreachindia.com/api/category/")
    .then((res)=>{
      seCategory(res.data.data)
    })
  },[])

  console.log(category)

  const handleAdd = () => {
    setEditingCategory(null); // reset for new
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="app-cards">
      {/* Title + Breadcrumb + Add User Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="mb-1">Category List</h5>
          <div className="text-muted small"> Dashboard / Category</div>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <i className="bi bi-plus me-2"></i>Add Category
        </button>
      </div>

      {/* Table Section */}
      <div className="app-card p-3">
        <div className="d-lg-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center mb-lg-0 mb-3">
            <label className="me-2">Show</label>
            <select
              className="form-select form-select-sm"
              style={{ width: "70px" }}
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <label className="ms-2">entries</label>
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Static Users Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>#</th>
                <th>Name</th>
                <th>Image</th>
                <th style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {category.map((data, index) => 
                <tr key={data.id || index}>
                  <td>{index +1 }</td>
                  <td>{data.name}</td>
                  <td>
                    <div className="user-info d-flex align-items-center gap-2">
                      <img
                        src={data.image}
                        alt="avatar"
                        className="avatar rounded"
                      />
                      {/* <span>Category Image</span> */}
                    </div>
                  </td>
                  <td>
                   <div className="d-flex">
                    <button
                      onClick={() =>
                        handleEdit({ id, name: `Category ${id}` })
                      }
                      className="btn btn-sm btn-primary me-2"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-sm btn-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>Showing {category.length} entries</div>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled">
                <span className="page-link">Previous</span>
              </li>
              <li className="page-item active">
                <span className="page-link">1</span>
              </li>
              <li className="page-item disabled">
                <span className="page-link">Next</span>
              </li>
            </ul>
          </nav>
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
                  {editingCategory ? "Edit Category" : "Add Category"}
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
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-control" placeholder="Enter category name"
                      defaultValue={editingCategory?.name || ""}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control" />
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
                <button type="button" className="btn btn-primary">
                  {editingCategory ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
