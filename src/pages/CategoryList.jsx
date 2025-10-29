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
  const [categoryPosition, setCategoryPosition] = useState("");

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get(`${baseURl}api/category/`)
      .then((res) => {
        setCategory(res.data.data || []);
        console.log(res.data);
      })
      .catch((err) => console.error("Error fetching categories:", err))
      .finally(() => setLoading(false));
  };

  // Handle Add
  const handleAdd = () => {
    setEditingCategory(null);
    setCategoryName("");
    setCategoryImage(null);
    setCategoryPosition("");
    setShowModal(true);
  };

  // Handle Edit
  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setCategoryName(cat.name);
    setCategoryPosition(cat.position || "");
    setCategoryImage(null);
    setShowModal(true);
  };

  // Close Modal
  const handleClose = () => {
    setShowModal(false);
    setEditingCategory(null);
    setCategoryName("");
    setCategoryImage(null);
    setCategoryPosition("");
  };

  // Add Category
  const addCategory = () => {
    if (!categoryName || !categoryImage) {
      alert("Please enter category name and image");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryImage);
    formData.append("position", categoryPosition);

    axios
      .post(`${baseURl}api/category/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert("Category added successfully");
        setCategory((prev) => [...prev, res.data.data]);
        handleClose();
      })
      .catch((err) => console.error("Error adding category:", err));
  };

  // Update Category
  const updateCategory = () => {
    if (!categoryName) {
      alert("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("position", categoryPosition);
    if (categoryImage) {
      formData.append("image", categoryImage);
    }

    axios
      .put(
        `${baseURl}api/category/${editingCategory._id || editingCategory.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        setCategory((prev) =>
          prev.map((cat) =>
            cat._id === (editingCategory._id || editingCategory.id)
              ? res.data.data
              : cat
          )
        );
        alert("Category updated successfully");
        handleClose();
      })
      .catch((err) => console.error("Error updating category:", err));
  };

  // Delete Category
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    axios
      .delete(`${baseURl}api/category/${id}`)
      .then(() => {
        alert("Category deleted successfully");
        setCategory((prev) =>
          prev.filter((data) => data.id !== id && data._id !== id)
        );
      })
      .catch((err) => console.error("Error deleting category:", err));
  };

  return (
    <div className="app-cards">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold text-primary mb-1">Category List</h4>
          <div className="text-muted small">Dashboard / Category</div>
        </div>
        <button className="btn btn-primary shadow-sm px-3" onClick={handleAdd}>
          <i className="bi bi-plus-lg me-2"></i>Add Category
        </button>
      </div>

      {/* Table Section */}
      <div className="app-card p-4 shadow-sm rounded-3 bg-white">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Loading categories...</p>
          </div>
        ) : (
          <>
            <div className="mb-3">
              <input
                type="text"
                className="form-control rounded-pill px-3"
                placeholder="🔍 Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle table-bordered">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "80px" }}>Position</th>
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
                      <tr key={data.id || data._id || index}>
                        <td>{data.position}</td>
                        <td className="fw-semibold">{data.name}</td>
                        <td>
                          <img
                            src={
                              data.image?.startsWith("http")
                                ? data.image
                                : `${baseURl}${data.image}`
                            }
                            alt="category"
                            className="rounded-circle border"
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
                              className="btn btn-sm btn-outline-primary me-2"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(data.id || data._id)
                              }
                              className="btn btn-sm btn-outline-danger"
                            >
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

      {/* Modal Section */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0 rounded-3">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold text-primary">
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
                    <label className="form-label fw-semibold">
                      Category Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter category name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setCategoryImage(e.target.files[0])}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Position</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g., 1"
                      value={categoryPosition}
                      onChange={(e) => setCategoryPosition(e.target.value)}
                    />
                  </div>
                </form>
              </div>

              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
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
