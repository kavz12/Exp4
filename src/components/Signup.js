import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMsg("✅ Registered successfully! Please login.");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setMsg("❌ " + data.message);
    }
  };

  return (
    <section className="p-10 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
            required
          />
          <label className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              name="isAdmin"
              checked={form.isAdmin}
              onChange={handleChange}
            />
            Register as Admin
          </label>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Signup
          </button>
        </form>
        {msg && <p className="text-center mt-3">{msg}</p>}
      </div>
    </section>
  );
};

export default Signup;
