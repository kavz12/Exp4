import { useEffect, useState } from "react";
import AddSkill from "./AddSkill";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    fetch("http://localhost:5000/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  return (
    <section className="p-10 text-center">
      <h2 className="text-3xl font-bold mb-4">Skills</h2>

      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((s) => (
          <li key={s._id} className="p-4 bg-gray-100 rounded shadow">
            <h3 className="font-semibold">{s.name}</h3>
            <p>Level: {s.level}</p>
          </li>
        ))}
      </ul>

      {isAdmin && (
        <div className="mt-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {showForm ? "Close" : "Add Skill"}
          </button>
          {showForm && <AddSkill onClose={() => setShowForm(false)} />}
        </div>
      )}
    </section>
  );
};

export default Skills;
