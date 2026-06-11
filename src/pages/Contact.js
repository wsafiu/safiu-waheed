import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../css/contact.css";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const contactRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
        },
      });

      tl.from("#contact .number-heading", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .from(
          "#contact h2",
          { scale: 0.85, opacity: 0, duration: 0.7, ease: "back.out(1.5)" },
          "-=0.2"
        )
        .from(
          "#contact .email__link",
          { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );
    },
    { scope: contactRef }
  );

  return (
    <section id="contact" ref={contactRef}>
      <h2 className="number-heading overline"> What's Next?</h2>
      <h2>Get In Touch</h2>

      <a
        className="email__link"
        href="mailto:waheedianho65@gmail.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        Say Hello
      </a>
    </section>
  );
}

export default Contact;

