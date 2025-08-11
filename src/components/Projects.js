const Projects = () => {
    const projects = [
      { title: "Portfolio Website", desc: "A personal portfolio built with MERN stack." },
      { title: "E-Commerce App", desc: "A full-stack e-commerce platform with user authentication." }
    ];
  
    return (
      <section id="projects" className="p-10 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-6">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((proj, i) => (
            <div key={i} className="bg-white p-5 shadow-lg rounded-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
              <p className="text-gray-600">{proj.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Projects;
  