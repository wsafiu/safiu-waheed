import Project from "../components/Project";
import project001 from "../assests/project001.png";
import project002 from "../assests/project002.png";

import "../css/project.css";

function Projects() {
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
  return (
    <section data-aos="fade-up" id="projects">
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
