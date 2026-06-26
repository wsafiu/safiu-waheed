import Intro from "./components/Intro";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Certifications from "./pages/Certification";
import ProjectGallery from "./components/ProjectGallery";
import Contact from "./pages/Contact";

import "./css/main.css";
function Main() {
  return (
    <main>
      <Intro />
      <About />
      <Experience />
      <Certifications />
      <ProjectGallery />
      <Contact />
    </main>
  );
}

export default Main;
