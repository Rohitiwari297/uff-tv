import { useState } from "react";
import axios from "axios";
import { baseURl } from "../Api/url";

export default function ChangePassword() {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURl}api/auth/admin-change-password`, {
        username,
        oldPassword,
        newPassword,
      });

      if (res.data.success) {
        setMessage("Password changed successfully. Please log in again.");
        // Optionally log out user
        localStorage.removeItem("token");
        // navigate("/login");
      } else {
        setMessage("Failed to change password.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error changing password.");
    }
  };

  return (
    <div className="p-4 flex " >
      <h3>Change Password</h3>
      <form onSubmit={handleChangePassword} className="d-flex flex-column gap-3 w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
      {message && <p className="mt-3 text-success">{message}</p>}
    </div>
  );
}
