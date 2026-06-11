import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Project from "../components/Project";
import project001 from "../assests/project001.png";
import project002 from "../assests/project002.png";

import "../css/project.css";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const sectionRef = useRef(null);

  const projects = [
    {
      id: 1,
      name: "Criminal Management System",
      desc:
        "A System to mechanize the existing manual system with computerized " +
        "equipment and developed computer software, fufilling the necessities of all" +
        "policemen. \n" +
        "Valuable data can be stock up for a more extended period with easy access ",
      image: project001,
      resources: [
        "ReactJS",
        "NodejS",
        "Express",
        "MongoDB",
        "Bootstrap",
        "Heroku",
      ],
      url: "https://crms-client.herokuapp.com/",
    },
    {
      id: 2,
      name: "Iseoluwa Portal",
      desc:
        "A single web page Application built with VueJs to showcase what we do @ <a href='https://iseoluwa.netlify.app'>ISEOLUWA</a> Cyber cafe",
      image: project002,
      resources: ["VueJS", "Netlify", "JavaScript", "Vuetify"],
      url: "https://iseoluwa.netlify.app/",
    },
  ];

  useGSAP(
    () => {
      gsap.from("#projects h3", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".projects li", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="projects" ref={sectionRef}>
      <h3 className="number-heading">Some Things I've Built</h3>
      <ul className="projects">
        {projects.map((project, i) => (
          <Project key={i} project={project} />
        ))}
      </ul>
    </section>
  );
}

export default Projects;

