import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const nav = useNavigate();
  const [show, setShow] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    nav("/dashboard");
  };

  return (
    <div className="auth-wrap d-flex align-items-center justify-content-center px-3 px-lg-0">
      <div className="auth-card">
        <div className="text-center mb-3">
          <span className="brand-icon me-2 align-middle"></span>
          <span className="brand-name align-middle">UFF TV</span>
        </div>

        <div className="text-center mb-3">
          <div className="login-title">Sign In</div>
          <div className="text-muted">Welcome back Uff TV!</div>
        </div>

        <form onSubmit={submit} className="mt-3">
          <div className="mb-3">
            <label className="form-label small text-muted">User Name</label>
            <input className="form-control" type="text" placeholder="user name" required />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-1">
            <label className="form-label small text-muted mb-0">Password</label>
            {/* <a href="#" className="small text-decoration-none" style={{color:"#a08fff"}}>Forget password ?</a> */}
          </div>

          <div className="input-group mb-2">
            <input className="form-control" type={show ? "text" : "password"} placeholder="password" required />
            <span className="input-group-text" role="button" onClick={()=>setShow(s=>!s)}>
              <i className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`}></i>
            </span>
          </div>

          <div className="form-check my-2">
            <input className="form-check-input" type="checkbox" id="remember" />
            <label className="form-check-label small" htmlFor="remember">Remember password ?</label>
          </div>

          <button className="btn btn-primary w-100 mt-3" type="submit">Sign In</button>
        </form>

        <div className="text-muted small text-center mt-3">
        Copyright © 2025 <span className="fw-semibold text-black">Uff tv</span>. Designed with <span class="bi bi-heart-fill text-danger"></span> by <a className="text-decoration-none" href="https://www.rssindia.com" target="_blank">www.rssindia.com</a> All rights reserved.
      </div>
      </div>
    </div>
  );
}
