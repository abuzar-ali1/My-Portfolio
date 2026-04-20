import Achievements from "./Components/Achievements";
import Certifications from "./Components/Certifications";
import Contact from "./Components/Contact";
import Education from "./Components/Education";
import AboutHero from "./Components/AboutHero";
import ProjectGrid from "./Components/ProjectGrid";
import Skills from "./Components/Skills";

async function getProjects() {
  const res = await fetch("http://localhost:8000/api/projects/", {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}
export default async function Home() {
  const backendProjects = await getProjects();

  return (
    <>
      <AboutHero />
      <ProjectGrid />
      <Skills />
      <Contact />
      <Certifications />
      <Achievements />
      <Education />
    </>
  );
}
