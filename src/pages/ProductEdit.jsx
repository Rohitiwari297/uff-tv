import { useParams } from "react-router-dom";

export default function ProductEdit() {
  const { id } = useParams();
  return (
    <div className="app-card">
      <div className="mb-3">
        <h5 className="mb-1">Edit Product</h5>
        <div className="text-muted small">Pages › Ecommerce › Edit Product</div>
      </div>
      <div className="alert alert-light border">
        Editing product <strong>#{id}</strong> (we’ll wire real data later).
      </div>
      {/* Reuse the Add form here in your codebase or split into a shared component */}
    </div>
  );
}
