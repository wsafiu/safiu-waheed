import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../css/contact.css";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const contactRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
        },
      });

      tl.from(".ambient-glow", {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.2
      })
        .from(".number-heading", {
          y: -20,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        }, "-=1.0")
        .from(
          "h2.title",
          { y: 30, opacity: 0, duration: 0.7, ease: "back.out(1.5)" },
          "-=0.3"
        )
        .from(
          ".contact__desc",
          { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          ".button__wrapper",
          { scale: 0.9, opacity: 0, duration: 0.6, ease: "back.out(2)" },
          "-=0.4"
        );

      // Magnetic Button Effect
      const btn = buttonRef.current;
      if (btn) {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });

        const handleMouseMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);

          xTo(x * 0.3);
          yTo(y * 0.3);
        };

        const handleMouseLeave = () => {
          xTo(0);
          yTo(0);
        };

        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          btn.removeEventListener("mousemove", handleMouseMove);
          btn.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    },
    { scope: contactRef }
  );

  return (
    <section id="contact" ref={contactRef}>
      {/* Ambient glows for Glassmorphism depth */}
      <div className="ambient-glow contact-glow-1"></div>
      <div className="ambient-glow contact-glow-2"></div>

      <div className="contact__inner">
        <h2 className="number-heading overline"> What's Next?</h2>
        <h2 className="title">Get In Touch</h2>

        <p className="contact__desc">

        </p>

        <div className="button__wrapper" ref={buttonRef}>
          <a
            className="email__link"
            href="mailto:waheedianho65@gmail.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Say Hello
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;

