import axios from "axios";
import { useEffect, useState } from "react";
import { baseURl } from "../Api/url";

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);

  // add states for new banner form
  const [redirectUrl, setRedirectUrl] = useState("");
  const [image, setImage] = useState(null);

  // states for edit modal
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, seteditingBanner] = useState(null);
  const [editRedirectUrl, setEditRedirectUrl] = useState("");
  const [editImage, setEditImage] = useState(null);

  // Fetch all banners (GET request)
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${baseURl}api/banner`);
        setBanner(res.data.data || []); // ensure array
      } catch (err) {
        console.error("Error fetching banners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Add new banner (POST request)
  const handleBanners = async (e) => {
    e.preventDefault();

    if (!redirectUrl || !image) {
      alert("Please provide a redirect URL and image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("redirectUrl", redirectUrl);
      formData.append("image", image);

      const res = await axios.post(`${baseURl}api/banner`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update UI instantly
      setBanner((prev) => [...prev, res.data.data]);

      // Reset form
      setRedirectUrl("");
      setImage(null);
    } catch (error) {
      console.error("Error uploading banner:", error);
    }
  };

  //handleDelete
  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`${baseURl}api/banner/${id}`)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);

        // update state -> filter out deleted banner
        setBanner((prev) => {
          const updated = prev.filter((banner) => banner._id !== id);
          console.log("After delete:", updated);
          return updated;
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //editHandler (PUT)
  const editHandler = async () => {
    if (!editingBanner) return;

    try {
      const formData = new FormData();
      formData.append("redirectUrl", editRedirectUrl);
      if (editImage) {
        formData.append("image", editImage);
      }

      const res = await axios.put(
        `${baseURl}api/banner/${editingBanner._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(res.data.message || "Banner updated successfully");

      // update UI instantly
      setBanner((prev) =>
        prev.map((item) =>
          item._id === editingBanner._id ? res.data.data : item
        )
      );

      setShowModal(false);
      seteditingBanner(null);
      setEditRedirectUrl("");
      setEditImage(null);
    } catch (error) {
      console.error("Error updating banner:", error);
      alert("Error updating banner");
    }
  };

  //model open
  const handleEdit = (category) => {
    seteditingBanner(category);
    setEditRedirectUrl(category.redirectUrl || "");
    setEditImage(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    seteditingBanner(null);
    setEditRedirectUrl("");
    setEditImage(null);
  };

  return (
    <div className="app-card p-3">
      <h3 className="mb-3">Banners</h3>

      {/* Add Banner Form */}
      <form onSubmit={handleBanners} className="mb-4">
        <div className="row">
          <div className="col-lg-5">
            <input
              type="text"
              className="form-control"
              placeholder="Redirect URL"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              required
            />
          </div>
          <div className="col-lg-5">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="col-lg-2">
            <button type="submit" className="btn btn-primary">
              Add Banner
            </button>
          </div>
        </div>
      </form>

      {/* Banner Table */}
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Redirect URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center ">
                Loading...
              </td>
            </tr>
          ) : banner.length > 0 ? (
            banner.map((data, index) => (
              <tr key={data._id || index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${baseURl}${data.image}`}
                    alt="banner"
                    style={{ width: "120px", borderRadius: "8px" }}
                    className="bannerImg"
                  />
                </td>
                <td>
                  <a href={data.redirectUrl} target="_blank" rel="noreferrer">
                    Click here
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => {
                      handleDelete(data._id || data.id);
                    }}
                    className="btn btn-sm btn-danger me-2"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    onClick={() => handleEdit(data)}
                    className="btn btn-sm btn-warning"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No banners found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Banner</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    editHandler();
                  }}
                >
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setEditImage(e.target.files[0])}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Redirect URL</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter URL"
                      value={editRedirectUrl}
                      onChange={(e) => setEditRedirectUrl(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
