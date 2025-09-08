// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// export default function App(){
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

// pages
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/UsersList";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
// import Profile from "./pages/Profile";
import CategoryList from "./pages/CategoryList";
import VideoList from "./pages/VideoList";
import LiveVideo from "./pages/LiveVideo";
import ChangePassword from "./pages/ChangePassword"
import Login from "./pages/Login"; // add Login page

export default function App() {
  return (
    <Routes>
      {/* First page is Login */}
      <Route path="/" element={<Login />} />

      {/* All pages inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UsersList />} />  
        <Route path="/products/add" element={<ProductAdd />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/category" element={<CategoryList />} />  
        <Route path="/video" element={<VideoList />} />
        <Route path="/live-video" element={<LiveVideo />} />  
        <Route path="/change-password" element={<ChangePassword />} />  
      </Route>

      {/* Fallback: redirect unknown routes to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


