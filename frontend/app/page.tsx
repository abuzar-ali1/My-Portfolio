import Achievements from "./Components/Achievements";
import Certifications from "./Components/Certifications";
import Contact from "./Components/Contact";
import Education from "./Components/Education";
import AboutHero from "./Components/AboutHero";
import ProjectGrid from "./Components/ProjectGrid";
import Skills from "./Components/Skills";
import Background from "./Components/Background";

export default async function Home() {

  return (
    <>
      <AboutHero />
      <ProjectGrid />
      <Skills />
      <Background/>
      <Contact />
     
    </>
  );
}
