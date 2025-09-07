import { useEffect, useState } from "react";
import AddProject from "./AddProject";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <section className="p-10 text-center">
      <h2 className="text-3xl font-bold mb-4">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div key={p._id} className="p-4 bg-gray-100 rounded shadow">
            <h3 className="font-semibold">{p.title}</h3>
            <p>{p.description}</p>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Project
              </a>
            )}
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className="mt-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {showForm ? "Close" : "Add Project"}
          </button>
          {showForm && <AddProject onClose={() => setShowForm(false)} />}
        </div>
      )}
    </section>
  );
};

export default Projects;
