import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../css/about.css";

gsap.registerPlugin(ScrollTrigger);

// shields.io badge URLs — same format used in GitHub READMEs
const skills = [
  { name: "C#", badge: "https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white" },
  { name: "JavaScript", badge: "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" },
  { name: "TypeScript", badge: "https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" },
  { name: "React", badge: "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" },
  { name: "Next.js", badge: "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" },
  { name: "NestJS", badge: "https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" },
  { name: "ASP.NET", badge: "https://img.shields.io/badge/ASP.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" },
  { name: "Node.js", badge: "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" },
  { name: "Express", badge: "https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" },
  { name: "MongoDB", badge: "https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" },
  { name: "PostgreSQL", badge: "https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" },
  { name: "MySQL", badge: "https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" },
  { name: "SQL Server", badge: "https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white" },
  { name: "Socket.IO", badge: "https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white" },
  { name: "gRPC", badge: "https://img.shields.io/badge/gRPC-244C5A?style=for-the-badge&logo=grpc&logoColor=white" },
  { name: "Firebase", badge: "https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" },
  { name: "Docker", badge: "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" },
  { name: "Git", badge: "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" },
];

const stats = [
  { value: "3+", label: "Years Experience" },
  // { value: "20+", label: "Projects Shipped" },
  { value: "5+", label: "Technologies" },
];

function About() {
  const aboutRef = useRef(null);

  useGSAP(
    () => {
      // Section heading
      gsap.from(".about h2", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 85%",
        },
      });

      // Left text column
      gsap.from(".about__text", {
        x: -60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
        },
      });

      // Right photo column
      gsap.from(".about__pic", {
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
        },
      });

      // Stat cards stagger
      gsap.from(".stat-card", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stats-row",
          start: "top 88%",
        },
      });

      // Skill pills stagger
      gsap.from(".skill-pill", {
        y: 15,
        opacity: 0,
        duration: 0.4,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skill__grid",
          start: "top 88%",
        },
      });
    },
    { scope: aboutRef }
  );

  return (
    <section id="about" className="about" ref={aboutRef}>
      <h2 className="number-heading">About Me</h2>

      <div className="inner">
        {/* ── Left: bio + stats + skills ── */}
        <div className="about__text">
          {/* bio paragraphs */}
          <div className="bio">
            <p>
              Hello! I'm <span>Waheed Safiu</span> — I build reliable backend systems,
              scalable APIs, and practical software products that solve real problems.
            </p>

            <p>
              I am a <span>Software Engineer</span> with a <span>Computer Science</span>
              background and hands-on experience across <span>ASP.NET Core,</span>
              <span>NestJS,</span> <span>databases,</span> <span>cloud tools,</span>
              and modern web technologies.
            </p>
            <p>
              My focus is simple: <span>Write clean code, design maintainable systems, and
                build software that creates real value for users, teams, and businesses.</span>
            </p>
          </div>

          {/* stat counters */}
          <div className="stats-row">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* tech label */}
          <p className="skills-intro">Technologies I work with:</p>

          {/* skill badges — shields.io style, same as GitHub README */}
          <ul className="skill__grid">
            {skills.map((skill) => (
              <li className="skill-pill" key={skill.name}>
                <img
                  src={skill.badge}
                  alt={skill.name}
                  height="28"
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: photo ── */}
        <div className="about__pic">
          <div className="wrapper">
            <div className="image_wrapper img">
              <picture>
                <img
                  width="500"
                  height="500"
                  decoding="async"
                  src="/profile.png"
                  srcSet="/profile.jpg"
                  alt="Waheed Safiu — headshot"
                  style={{ objectFit: "cover", opacity: 1 }}
                />
              </picture>
            </div>
          </div>

          {/* floating accent badge */}
          <div className="pic-badge">
            <span>Open to work</span>
            <span className="badge-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
