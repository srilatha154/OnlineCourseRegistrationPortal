import { useEffect, useState } from "react";
import axios from "axios";
import "./PortalCrud.css";
const BASE_URL = "http://localhost:8081";
export default function PortalCRUD() {
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState({});
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: ""
  });
  //Load students
  const loadStudents = async () => {
    const res = await axios.get(`${BASE_URL}/students/getstudents`);
    setStudents(Array.isArray(res.data) ? res.data : []);
  };
  //Load enrollments
  const loadEnrollments = async (studentId) => {
    try {
      const res = await axios.get(`${BASE_URL}/enroll/${studentId}`);
      setEnrollments(prev => ({
        ...prev,
        [studentId]: res.data
      }));
    } catch {
      setEnrollments(prev => ({
        ...prev,
        [studentId]: []
      }));
    }
  };
  useEffect(() => {
    loadStudents();
  }, []);
  useEffect(() => {
    students.forEach(s => loadEnrollments(s.id));
  }, [students]);
  //DELETE
  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/students/deletestudent/${id}`);
    loadStudents();
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      branch: student.branch
    });
  };
  const handleUpdate = async () => {
  try {
    await axios.put(
      `${BASE_URL}/students/updatestudent/${editingStudent}`,
      formData
    );
    setEditingStudent(null);
    setFormData({ name: "", email: "", branch: "" });
    loadStudents();
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="container">
      <h2 className="title">Student Dashboard</h2>
      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
        />
        {editingStudent && (
          <button className="btn" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Courses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.branch}</td>
              <td>
                {enrollments[s.id]?.length > 0
                  ? enrollments[s.id]
                      .map(e => e.course.courseName)
                      .join(", ")
                  : "No Courses"}
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}