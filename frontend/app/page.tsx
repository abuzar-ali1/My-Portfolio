import Achievements from "./Components/Achievements";
import Certifications from "./Components/Certifications";
import Contact from "./Components/Contact";
import Education from "./Components/Education";
import AboutHero from "./Components/AboutHero";
import ProjectGrid from "./Components/ProjectGrid";
import Skills from "./Components/Skills";


export default function Home() {

  async function fetchProjects(data: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const projects = await response.json();
    return projects;

  }



  return (
    <>
    <AboutHero/>
    <ProjectGrid/>
    <Skills/>
    <Contact/>
    <Certifications/>
    <Achievements/>
    <Education/>
    </>
  );
}
