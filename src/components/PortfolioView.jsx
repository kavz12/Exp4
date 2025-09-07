import React, { useEffect, useState } from "react";
import UpdateBio from "./UpdateBio"; // Corrected import
import AddSkill from "./AddSkill";
import AddProject from "./AddProject";

const PortfolioView = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [bio, setBio] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);

  // Fetch all portfolio data for this user
  useEffect(() => {
    if (!userId || !token) return;

    // Fetch bio
    fetch(`http://localhost:5000/api/bio/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setBio)
      .catch(console.error);

    // Fetch skills
    fetch(`http://localhost:5000/api/skills/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setSkills)
      .catch(console.error);

    // Fetch projects
    fetch(`http://localhost:5000/api/project/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, [userId, token]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Bio Section */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{bio.name || "Your Name"}</h1>
        <p className="mb-2">
          {bio.description || "Your bio description goes here."}
        </p>
        {isAdmin && <UpdateBio bio={bio} setBio={setBio} />}{" "}
        {/* Corrected usage */}
      </section>

      {/* Skills Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        {skills.length > 0 ? (
          <ul className="list-disc ml-6">
            {skills.map((s) => (
              <li key={s._id}>{s.name}</li>
            ))}
          </ul>
        ) : (
          <p>No skills added yet.</p>
        )}
        {isAdmin && <AddSkill skills={skills} setSkills={setSkills} />}
      </section>

      {/* Projects Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Projects</h2>
        {projects.length > 0 ? (
          projects.map((p) => (
            <div key={p._id} className="mb-4 border p-3 rounded shadow">
              <h3 className="font-bold">{p.title}</h3>
              <p>{p.description}</p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {p.link}
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No projects added yet.</p>
        )}
        {isAdmin && (
          <AddProject projects={projects} setProjects={setProjects} />
        )}
      </section>
    </div>
  );
};

export default PortfolioView;
