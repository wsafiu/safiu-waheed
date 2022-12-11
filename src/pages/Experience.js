import { useState } from "react";
import Tab from "../components/Tab";
import Content from "../components/Content";

import "../css/experience.css";

function Experience() {
  const [active, setActive] = useState(1);
  const experiences = [
    {
      tabTitle: "Iseoluwa",
      companyName: "Iseoluwa Cyber Cafe",
      title: "Operator",
      date: "May 2017 - Present",
      url: "",
      roles: [
        "Work with variety of Information Management Tools such as Microsoft <span>Word</span>, <span>Excel</span> & <span>Powerpoint</span>",
        "Work with design package like <span>Adobe PageMaker</span>, <span>Photoshop & Illustrator</span>",
        "Communicate with different co-workers and customers",
      ],
    },
    {
      tabTitle: "Amqor",
      companyName: "Amqor Foundation College",
      title: "Teacher",
      date: "Nov. 2020 - April 2021",
      url: "",
      roles: [
        "Work as Subject Teacher for <span>Data Processing</span> & <span>Mathematics</span>",
        "Work with design package like <span>Adobe PageMaker</span>, <span>Photoshop & Illustrator</span>",
        "Communicate with different techers and parents",
      ],
    },
    {
      tabTitle: "Kodek",
      companyName: "Kodek Innovation",
      title: "Intern",
      date: "Jan. 2022  - till date",
      url: "https://kodekinnovations.com/",
      roles: [
        "Handle E-learning studio recording.",
        "Work with <span>Camtasia</span> to develop and manage E-learning video",
        "Worked closely with team of developer to develop E-learning content for company like <span>BOI</span>, <span>ICAN</span> and other institute",
      ],
    },
  ];

  const setActiveTab = (e) => {
    const { target } = e.currentTarget.dataset;
    console.log(target);
    setActive(target);
  };
  return (
    <section id="experience" data-aos="fade-up">
      <h2 className="number-heading">Where I've Worked</h2>
      <div className="inner">
        <div className="tablist">
          {experiences.map((experience, i) => (
            <Tab
              experience={experience}
              key={i}
              active={i === Number(active) ? true : false}
              id={i}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>
        <div className="tab__contents">
          {experiences.map((experience, i) => (
            <Content
              experience={experience}
              hidden={i === Number(active) ? false : true}
              key={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
