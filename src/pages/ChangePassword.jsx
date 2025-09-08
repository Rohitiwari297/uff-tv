import { useState } from "react";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
     <div className="app-cards">
      {/* Title + Breadcrumb + Add User Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="mb-1">Change Password</h5>
          <div className="text-muted small"> Dashboard / Change Password</div>
        </div>
        {/* <Link to="/users/add" className="btn btn-primary">
          <i className="fa fa-plus me-2"></i>Add User
        </Link> */}
      </div>

      {/* change password Section */}
      <div className="app-card p-3">
      <div className="row">
         {/* Current Password */}
        <div className="col-lg-4">
        <div className="mb-3">
        <label className="form-label">Current Password</label>
        <div className="input-group">
          <input
            type={showPassword.current ? "text" : "password"}
            className="form-control"
            placeholder="current password"
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => togglePassword("current")}
          >
            <i className={`bi ${showPassword.current ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        </div>
      </div>
        </div>
        <div className="col-lg-4">
              {/* New Password */}
      <div className="mb-3">
        <label className="form-label">New Password</label>
        <div className="input-group">
          <input
            type={showPassword.newPass ? "text" : "password"}
            className="form-control"
            placeholder="new password"
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => togglePassword("newPass")}
          >
            <i className={`bi ${showPassword.newPass ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        </div>
      </div>
        </div>
        <div className="col-lg-4">
             {/* Confirm Password */}
      <div className="mb-3">
        <label className="form-label">Confirm Password</label>
        <div className="input-group">
          <input
            type={showPassword.confirm ? "text" : "password"}
            className="form-control"
            placeholder="confirm password"
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => togglePassword("confirm")}
          >
            <i className={`bi ${showPassword.confirm ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        </div>
      </div>
        </div>
      </div>

      {/* Submit Button */}
      <button className="btn btn-primary" type="submit">Submit</button>
      </div>
    </div>
  );
}
