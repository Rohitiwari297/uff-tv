import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { baseURl } from "../Api/url";

export default function CategoryList() {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get(`${baseURl}api/category/`)
      .then((res) => setCategory(res.data.data || []))
      .catch((err) => console.error("Error fetching categories:", err))
      .finally(() => setLoading(false));
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setCategoryName("");
    setCategoryImage(null);
    setShowModal(true);
  };

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setCategoryImage(null);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // Add category
  const addCategory = () => {
    if (!categoryName || !categoryImage) {
      alert("Please enter category name and image");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryImage);

    axios
      .post(`${baseURl}api/category/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert("Category added");
        setCategory((prev) => [...prev, res.data.data]); // update instantly
        setShowModal(false);
        setCategoryName("");
        setCategoryImage(null);
      })
      .catch((err) => console.error("Error adding category:", err));
  };

  // Update category
  const updateCategory = () => {
    if (!categoryName) {
      alert("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    if (categoryImage) formData.append("image", categoryImage);

    axios
      .put(`${baseURl}api/category/${editingCategory.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setCategory((prev) =>
          prev.map((cat) =>
            cat.id === editingCategory.id ? res.data.data : cat
          )
        );
        setShowModal(false);
        setEditingCategory(null);
        setCategoryName("");
        setCategoryImage(null);
      })
      .catch((err) => console.error("Error updating category:", err));
  };

  //Delete Category
  const handleDelete = (id) => {
    // console.log(id)
    axios 
      .delete(`${baseURl}`)
  }


  return (
    <div className="app-cards">
      {/* Title + Add Category */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="mb-1">Category List</h5>
          <div className="text-muted small"> Dashboard / Category</div>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <i className="bi bi-plus me-2"></i>Add Category
        </button>
      </div>

      {/* Table */}
      <div className="app-card p-3">
        {loading ? (
          <div className="text-center">loading...</div>
        ) : (
          <>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
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
                  {category
                    .filter((item) =>
                      search
                        ? item.name.toLowerCase().includes(search.toLowerCase())
                        : true
                    )
                    .map((data, index) => (
                      <tr key={data.id || index}>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>
                          <img
                            src={
                              data.image?.startsWith("http")
                                ? data.image
                                : `${baseURl}${data.image}`
                            }
                            alt="category"
                            className="avatar rounded"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>
                          <div className="d-flex">
                            <button
                              onClick={() => handleEdit(data)}
                              className="btn btn-sm btn-primary me-2"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button
                              onClick={()=> handleDelete(data.id || data._id)} className="btn btn-sm btn-danger">
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
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
                      className="form-control"
                      placeholder="Enter category name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setCategoryImage(e.target.files[0])}
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
                  onClick={editingCategory ? updateCategory : addCategory}
                >
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
