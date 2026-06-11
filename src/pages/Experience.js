import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tab from "../components/Tab";
import Content from "../components/Content";

import "../css/experience.css";

gsap.registerPlugin(ScrollTrigger);

function Experience() {
  const [active, setActive] = useState(1);
  const sectionRef = useRef(null);

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
          "Developed a push notification system for a Core Banking System to enable seamless notifications.",
          "Ensure proper documentation using <span>Swagger</span>",
        "Communicate with different co-workers and customers",
        "Technologies and Tools <span>C#</span>, <span>AspNetCore</span>, <span>Rider</span>, <span>Azure Data Studio</span>, <span>MSSQL</span>",
      ],
    },
  ];

  useGSAP(
    () => {
      gsap.from("#experience h2", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".tablist", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".tab__contents", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  const setActiveTab = (e) => {
    const { target } = e.currentTarget.dataset;
    setActive(target);
  };

  return (
    <section id="experience" ref={sectionRef}>
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

