import { useState } from "react";

const AddSkill = ({ onClose }) => {
  const [form, setForm] = useState({ name: "", level: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("✅ Skill added");
      onClose();
      window.location.reload(); // reload to show new skill
    } else {
      alert("❌ Failed to add skill");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 shadow rounded">
      <input
        name="name"
        placeholder="Skill Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
        required
      />
      <input
        name="level"
        placeholder="Skill Level (Beginner, Intermediate, Expert)"
        value={form.level}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded mr-2"
      >
        Add
      </button>
      <button
        onClick={onClose}
        type="button"
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </form>
  );
};

export default AddSkill;
