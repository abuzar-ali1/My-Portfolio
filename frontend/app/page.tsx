import AboutHero from "./Components/AboutHero";
import ProjectGrid from "./Components/ProjectGrid";
import Skills from "./Components/Skills";
import Background from "./Components/Background";
import AiFitChecker from "./Components/AiFitChecker";
import Contact from "./Components/Contact";

export default async function Home() {

  return (
    <>
      <AboutHero />
      <ProjectGrid />
      <Skills />
      <Background/>
      <AiFitChecker/>

      <Contact />
     
    </>
  );
}
