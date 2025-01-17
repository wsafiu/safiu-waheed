import { useState } from "react";
import Tab from "../components/Tab";
import Content from "../components/Content";

import "../css/experience.css";

function Experience() {
  const [active, setActive] = useState(1);
  const experiences = [
    {
      tabTitle: "Kodek",
      companyName: "Kodek Innovation",
      title: "Front Engineer - Intern",
      date: "Jan. 2022  - 2023",
      url: "https://kodekinnovations.com/",
      roles: [
        "Manage E-learning website",
        "Work with <span>HTML</span>, <span>CSS</span> and <span>JS</span> to develop homepage for all company application",
        "Work with <span>React</span> to develop the company website",
        // "Worked closely with team of developer to develop E-learning content for company like <span>BOI</span>, <span>ICAN</span> and other institute",
      ],
    },
    {
      tabTitle: "Techies",
      companyName: "Techies Info Sysytem",
      title: "Backend Engineer - Intern",
      date: "Jan. 2023  -  June 2024",
      url: "",
      roles: [
        "Developed a background job processing API for a Core Banking System to check and retry failed\n" +
        "SMS and email notifications.\n " ,
        // "<span>Word</span>, <span>Excel</span> & <span>Powerpoint</span>",
          "Developed a push notification system for a Core Banking System to enable seamless notifications.",
          "Ensure proper documentation using <span>Swagger</span>",
        "Communicate with different co-workers and customers",
        "Technologies and Tools <span>C#</span>, <span>AspNetCore</span>, <span>Rider</span>, <span>Azure Data Studio</span>, <span>MSSQL</span>",
      ],
    },
    // {
    //   tabTitle: "Amqor",
    //   companyName: "Amqor Foundation College",
    //   title: "Teacher",
    //   date: "Nov. 2020 - April 2021",
    //   url: "",
    //   roles: [
    //     "Work as Subject Teacher for <span>Data Processing</span> & <span>Mathematics</span>",
    //     "Work with design package like <span>Adobe PageMaker</span>, <span>Photoshop & Illustrator</span>",
    //     "Communicate with different techers and parents",
    //   ],
    // },
    
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
