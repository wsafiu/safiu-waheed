import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../css/about.css";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const aboutRef = useRef(null);

  useGSAP(
    () => {
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

      gsap.from(".skill__list li", {
        y: 15,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skill__list",
          start: "top 85%",
        },
      });
    },
    { scope: aboutRef }
  );

  return (
    <section id="about" className="about" ref={aboutRef}>
      <h2 className="number-heading">About Me</h2>
      <div className="inner">
        <div className="about__text">
          <div>
            <p>
              Hello! My name is Waheed Safiu, <br />
              I'm software engineering(backend) with proficiency in Node.js and .NET. Strong background in developing
              scalable and robust applications using modern web technologies. Studies Computer Science at the
              prestigious University of Ibadan and I enjoy programming and I'm capable of delivering
              high-quality projects on time. Passionate about learning new technologies and improving code quality.
            </p>

            <p>
              Fast-forward to today, and I've had the priviledge of learning
              different language like <span>JavaScript</span>, <span>Java</span>
              , <span>C#</span>, <span>Phython</span> and framework
              like <span>ReactJS</span>, <span>NextJs</span>, <span>AspNetCore</span>, <span>NestJs </span>
              which I hope will be useful for different project in the future
            </p>

            <p>Here are the few technologies I have work with</p>

            <ul className="skill__list">
              <li>NestJs</li>
              <li>React-Native</li>
              <li>AspNetCore</li>
              <li>Nextjs</li>
              <li>Grpc</li>
              <li>React</li>
              <li>Mongodb</li>
              <li>SocketIO</li>
              <li>MSSQL</li>
            </ul>
          </div>
        </div>
        <div className="about__pic">
          <div className="wrapper">
            <div className="image_wrapper img">
              <picture>
                <img
                  width="500px"
                  height="500px"
                  data-main-image=""
                  sizes="(min-width: 500px) 500px, 100vw"
                  decoding="async"
                  src="/profile.png"
                  srcset="/profile.jpg"
                  alt="Headshot"
                  style={{ objectFit: "cover", opacity: 1 }}
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

