// src/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // check token
  return token ? children : <Navigate to="/Login" />; // redirect to login if not logged in
}