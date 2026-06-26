import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Project from "../components/Project";
import cert001 from "../assests/cert001.png";
import cert002 from "../assests/cert002.png";
import cert003 from "../assests/cert003.png";

import "../css/certification.css";

gsap.registerPlugin(ScrollTrigger);


function Certifications() {
  const sectionRef = useRef(null);

  const projects = [
    {
      id: 1,
      name: "Mastering MediaSoup: Live Streaming & Video Conferencing SFU",
      desc:
        `Build live streaming and video conferencing 
        applications using MediaSoup, the leading WebRTC SFU. Master server-side media routing, simulcast, recording, and real-time data transmission.`,
      image: cert001,
      skillSets: [
        "mediasoup",
        "nodejs",
        "typescript",
        "exoress",
        "socket.io"
      ],
      url: "https://www.udemy.com/certificate/UC-20f310f3-8b43-4fdf-a8ce-8add1235a834/",
    },
    {
      id: 2,
      name: ".Net Core Microservice - The Complete Guide (.Net8 MVC)",
      desc:
        "Build enterprise-level .NET Core web APIs and microservices from scratch using .NET 8 MVC, AutoMapper, and Entity Framework.",
      image: cert002,
      skillSets: [
        "ASP.NET Core MVC",
        "ASP.NET Core Web API",
        "AutoMapper",
        "Entity Framework",
        ".NET 8",
        "RabiitMq",
        "Grpc",
        "Gateway"
      ],
      url: "https://www.udemy.com/certificate/UC-5e065b63-6502-4ee4-971c-4e85e2109021/",
    },
    {
      id: 3,
      name: "Server-side Development with NodeJS, Express and MongoDB",
      desc:
        "Master backend development by building REST APIs, user authentication, and real-time applications with NodeJS, Express, and MongoDB.",
      image: cert003,
      skillSets: [
        "NodeJS",
        "Express",
        "MongoDB",
        "JWT",
        "Passport",
      ],
      url: "https://coursera.org/verify/6FZ7L9G6EZKP",
    },
    // {
    //   id: 4,
    //   name: ".Net Core Microservice - The Complete Guide (.Net8 MVC)",
    //   desc:
    //     "Build enterprise-level .NET Core web APIs and microservices from scratch using .NET 8 MVC, AutoMapper, and Entity Framework.",
    //   image: cert002,
    //   skillSets: [
    //     "ASP.NET Core MVC",
    //     "ASP.NET Core Web API",
    //     "AutoMapper",
    //     "Entity Framework",
    //     ".NET 8",
    //     "RabiitMq",
    //     "Grpc",
    //     "Gateway"
    //   ],
    //   url: "https://www.udemy.com/certificate/UC-5e065b63-6502-4ee4-971c-4e85e2109021/",
    // },
  ];


  useGSAP(
    () => {
      const section = sectionRef.current;

      gsap.fromTo(
        "h3",
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            invalidateOnRefresh: true,
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".projects li",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects",
            start: "top 80%",
            invalidateOnRefresh: true,
            once: true,
          },
        }
      );

      // ── 2. Build the CodePen-style layered pinning ─────────────────────
      const panels = gsap.utils.toArray(section.querySelectorAll(".project"));

      panels.forEach((panel, i) => {
        // We don't animate or pin the very last panel because there's nothing 
        // coming after it to scroll up and cover it.
        if (i === panels.length - 1) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top 100px",  // Pin when the top of panel reaches below the navbar
            end: "bottom top",   // Unpin when the bottom of panel would have reached the top of the viewport
            pinSpacing: false,   // THIS IS THE MAGIC! Next panel scrolls right over it.
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          }
        });

        // The scaling and fading effect from the demo
        tl.fromTo(
          panel,
          { scale: 1, opacity: 1 },
          { scale: 0.8, opacity: 0.5, duration: 0.9 }
        ).to(panel, { opacity: 0, duration: 0.1 });
      });
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const refresh = () =>
      requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));

    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh, { once: true });
    }

    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <section id="certifications" ref={sectionRef}>
      <h3 className="number-heading">Certifications</h3>
      <ul className="projects">
        {projects.map((project, i) => (
          <Project key={i} project={project} index={i} />
        ))}
      </ul>
    </section>
  );
}

export default Certifications;

