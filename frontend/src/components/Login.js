import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
        <div className="container my-5 p-4 shadow-lg bg-white rounded" style={{ maxWidth: '500px' }}>
      <h2 className="text-center text-primary mb-4">Login</h2>
    <form onSubmit={handleSubmit} className="container my-3">
      <input type="email" name="email" placeholder="Email" onChange={onChange} className="form-control my-2" required />
      <input type="password" name="password" placeholder="Password" onChange={onChange} className="form-control my-2" required />
      <button className="btn btn-primary">Login</button>
    </form>
    </div>
  );
};

export default Login;