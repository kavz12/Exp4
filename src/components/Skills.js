const Skills = () => {
    const skills = ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JavaScript", "Cybersecurity"];
  
    return (
      <section id="skills" className="p-10 bg-white text-center">
        <h2 className="text-4xl font-bold mb-6">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    );
  };
  
  export default Skills;
  