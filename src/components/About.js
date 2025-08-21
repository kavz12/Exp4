import { useEffect, useState } from "react";

const About = () => {
  const [bio, setBio] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/bio")
      .then((res) => res.json())
      .then((data) => setBio(data))
      .catch((err) => console.error(err));
  }, []);

  if (!bio) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section id="about" className="p-10 bg-white text-center">
      <h2 className="text-4xl font-bold mb-4">About Me</h2>
      <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
        <strong>Name:</strong> {bio.name} <br />
        <strong>Role:</strong> {bio.role} <br />
        <strong>About:</strong> {bio.about} <br />
        <strong>Email:</strong> {bio.email} <br />
        <strong>Location:</strong> {bio.location}
      </p>
    </section>
  );
};

export default About;
