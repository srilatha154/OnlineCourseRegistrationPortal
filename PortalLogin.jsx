import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PortalLogin.css";
const BASE_URL = "http://localhost:8081";
export default function PortalLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/students/login`, form);
      localStorage.setItem("user", JSON.stringify(res.data));
      setMsg("Login Successful");
      setTimeout(() => nav("/dashboard"), 500);
    } catch (err) {
      const m = err.response?.data;
      if (m === "Email not found") setMsg("Email not registered");
      else if (m === "Wrong password") setMsg("Incorrect password");
      else setMsg("Login Failed");
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setForm({...form, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setForm({...form, password: e.target.value})}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="message">{msg}</p>
      <a href="/register">New user? Register</a>
    </div>
  );
}