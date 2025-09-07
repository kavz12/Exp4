import { useState } from "react";

const UpdateBio = ({ bio, setBio }) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // ✅ Only admin can edit
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: bio?.name || "",
    role: bio?.role || "",
    about: bio?.about || "",
    email: bio?.email || "",
    location: bio?.location || "",
  });

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Update Bio
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/bio/${bio._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update bio");
      const updated = await res.json();
      setBio(updated);
      setEditMode(false);
      alert("✅ Bio updated successfully!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  // ✅ If not admin, don’t show edit button
  if (!isAdmin) return null;

  return (
    <div className="mt-4">
      {editMode ? (
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Name"
          />
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Role"
          />
          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="About"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Email"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Location"
          />

          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="ml-2 bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditMode(true)}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Edit Bio
        </button>
      )}
    </div>
  );
};

export default UpdateBio;
