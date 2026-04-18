import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PortalRegister.css";
const BASE_URL = "http://localhost:8081";
export default function PortalRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    branch: "",
    password: "",
    courseId: ""
  });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/students/register`, form);
      setMsg("Successfully Registered ✅");
      setForm({
        name: "",
        email: "",
        contact: "",
        branch: "",
        password: "",
        courseId: ""
      });
    } catch (err) {
      setMsg(err.response?.data || "Registration Failed");
    }
  };
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Course Registration</h2>
        <form onSubmit={submit}>
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}
            required
          />
          <input
            placeholder="Contact"
            value={form.contact}
            onChange={(e)=>setForm({...form,contact:e.target.value})}
          />
          <input
            placeholder="Branch"
            value={form.branch}
            onChange={(e)=>setForm({...form,branch:e.target.value})}
          />
          <select
            value={form.courseId}
            onChange={(e)=>setForm({...form,courseId:e.target.value})}
            required
          >
            <option value="">Select Course</option>
            <option value="1">DevOps</option>
            <option value="2">Java Programming</option>
            <option value="3">Python Programming</option>
            <option value="4">Cloud Computing</option>
            <option value="5">Cyber Security</option>
            <option value="6">Data Science</option>
            <option value="7">Data Analytics</option>
            <option value="8">Web Development</option>
            <option value="9">Frontend Development</option>
            <option value="10">Backend Development</option>
            <option value="11">Data Structures</option>
            <option value="12">SQL</option>
            <option value="13">MERN Stack</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e)=>setForm({...form,password:e.target.value})}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p className="message">{msg}</p>
        <p className="login-link">
          Already registered?{" "}
          <span onClick={() => nav("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}