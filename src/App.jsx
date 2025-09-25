import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

// pages
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/UsersList";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import CategoryList from "./pages/CategoryList";
import VideoList from "./pages/VideoList";
import LiveVideo from "./pages/LiveVideo";
import Banner from "./pages/Banner";
import ChangePassword from "./pages/ChangePassword";
import Login from "./pages/Login";
import PrivateRoute from "./helpers/PrivateRoute"; // <-- import here
import TopVideos from "./pages/TopVideos";
import TopRetentions from "./pages/TopRetentions";

export default function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Login />} />

      {/* Protected routes inside MainLayout */}
      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/products/add" element={<ProductAdd />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/video" element={<VideoList />} />
        <Route path="/live-video" element={<LiveVideo />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/topVideos" element={<TopVideos/>} />
        <Route path="/topRetentions" element={<TopRetentions/>} />

      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
