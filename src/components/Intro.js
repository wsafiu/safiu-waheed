import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

import "../css/intro.css";
import ResumeBtn from "./ResumeBtn";

gsap.registerPlugin(TextPlugin);

function Intro() {
  const introRef = useRef(null);

  useGSAP(
    () => {
      // Staggered reveal: h1 → h2 → h3 → p → a
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".intro h1", { x: -40, opacity: 0, duration: 0.7 })
        .from(".intro h2", { x: -40, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".intro h3", { x: -40, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".intro p", { x: -40, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".intro .email-link", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3");

      // Typewriter loop using TextPlugin
      const roles = [
        "Sofware Engineer",
        "Aspiring XR Developer",
        "I build tools and reliable system",
      ];
      let roleIndex = 0;

      const typeRole = () => {
        const typeTl = gsap.timeline({
          onComplete: () => {
            roleIndex = (roleIndex + 1) % roles.length;
            // Pause before erasing
            gsap.delayedCall(1.2, () => {
              gsap.to("#stack", {
                duration: 0.5,
                text: { value: "", rtl: false },
                ease: "none",
                onComplete: () => gsap.delayedCall(0.3, typeRole),
              });
            });
          },
        });

        typeTl.to("#stack", {
          duration: roles[roleIndex].length * 0.06,
          text: { value: roles[roleIndex], delimiter: "" },
          ease: "none",
        });
      };

      // Start the typewriter after the initial stagger completes
      tl.call(typeRole);
    },
    { scope: introRef }
  );

  return (
    <section className="intro" ref={introRef}>
      <div className="">
        <h1>Hi, my name is</h1>
      </div>
      <div>
        <h2 className="big-heading">Waheed Safiu</h2>
      </div>
      <div>
        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
        <h3 id="stack" aria-label="Role title"></h3>
      </div>
      <div>
        <p>
          Second-class upper computer science graduate from the University of Ibadan.
          I am skilled in <mark>backend development</mark>, {" "}<mark>distributed systems</mark>,
          {" "}<mark>infrastructure tools</mark>, and {" "}<mark>API design</mark> using modern technologies.
          I have a very strong interest in networking and infrastructure management, with a
          commitment to continuous learning and problem-solving.
        </p>
      </div>

      <div className="" style={{ paddingTop: "25px" }}>
        <ResumeBtn title="Check out my Resume!" />
      </div>
    </section>
  );
}

export default Intro;

