export default function ProductAdd() {
  return (
    <div className="app-card">
      <div className="mb-3">
        <h5 className="mb-1">Add Product</h5>
        <div className="text-muted small">Pages › Ecommerce › Add Product</div>
      </div>

      <form className="row g-3">
        <div className="col-12">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" placeholder="Name" />
          <div className="form-text">*Product Name should not exceed 30 characters</div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Size</label>
          <select className="form-select"><option>Select</option></select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Brand</label>
          <select className="form-select"><option>Select</option></select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select className="form-select"><option>Category</option></select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Gender</label>
          <select className="form-select"><option>Select</option></select>
        </div>

        <div className="col-md-8">
          <label className="form-label">Colors</label>
          <input type="text" className="form-control" placeholder="e.g. Red, Blue" />
        </div>
        <div className="col-md-4">
          <label className="form-label">Enter Cost</label>
          <input type="text" className="form-control" placeholder="Cost" />
          <div className="form-text">*Mention final price of the product</div>
        </div>

        <div className="col-12">
          <label className="form-label">Product Description</label>
          <textarea className="form-control" rows="4" placeholder="Write details..."></textarea>
        </div>

        <div className="col-12">
          <button className="btn btn-primary">Save Product</button>
        </div>
      </form>
    </div>
  );
}
