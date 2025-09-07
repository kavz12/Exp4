import { useEffect, useState } from "react";

const About = () => {
  const [bio, setBio] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    fetch("http://localhost:5000/api/bio")
      .then((res) => res.json())
      .then((data) => {
        setBio(data);
        setForm(data);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/bio/${bio._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
      setBio(updated);
      setEditMode(false);
      alert("✅ Bio updated");
    }
  };

  if (!bio) return <p className="text-center">Loading...</p>;

  return (
    <section className="p-10 text-center">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>

      {editMode ? (
        <div className="max-w-md mx-auto">
          <input
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border mb-2"
          />
          <input
            name="role"
            value={form.role || ""}
            onChange={handleChange}
            placeholder="Role"
            className="w-full p-2 border mb-2"
          />
          <textarea
            name="about"
            value={form.about || ""}
            onChange={handleChange}
            placeholder="About"
            className="w-full p-2 border mb-2"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <p>
          <strong>{bio.name}</strong> - {bio.role} <br />
          {bio.about}
        </p>
      )}

      {isAdmin && !editMode && (
        <button
          onClick={() => setEditMode(true)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Bio
        </button>
      )}
    </section>
  );
};

export default About;
