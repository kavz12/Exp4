import { useState } from "react";

const AddProject = ({ fetchProjects }) => {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    title: "",
    description: "",
    github: "", // ✅ New field
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ title: "", description: "", github: "" });
      fetchProjects();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <textarea
        name="description"
        placeholder="Project Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="url"
        name="github"
        placeholder="GitHub Link"
        value={form.github}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Add Project
      </button>
    </form>
  );
};

export default AddProject;
