import AboutHero from "./Components/AboutHero";
import ProjectGrid from "./Components/ProjectGrid";
import Skills from "./Components/Skills";
import Background from "./Components/Background";
import Contact from "./Components/Contact";
import AskPortfolio from "./Components/AskPortfolio";

export default async function Home() {
  return (
    <>
      <AboutHero />
      <ProjectGrid />
      <AskPortfolio />
      <Skills />
      <Background />
      <Contact />
    </>
  );
}
