import { useEffect } from "react";

// import ResumeBtn from "./ResumeBtn";
import "../css/intro.css";

function Intro() {
  useEffect(() => {
    const stack = document.querySelector("#stack");
    const stackContent = stack.textContent.split("");
    stack.textContent = "";

    let forwardCounter = 0;
    let backwardCounter = stackContent.length;
    let currentText = "";

    setInterval(() => {
      if (forwardCounter === stackContent.length && backwardCounter >= 0) {
        currentText = currentText.slice(0, backwardCounter);
        stack.textContent = currentText;

        if (backwardCounter === 0) {
          forwardCounter = 0;
          currentText = "";
        }
        backwardCounter--;
      } else {
        currentText = currentText + stackContent[forwardCounter];
        stack.textContent = currentText;
        forwardCounter++;
        if (forwardCounter === stackContent.length)
          backwardCounter = currentText.length;
      }
    }, 300);
  }, []);

  return (
    <section className="intro">
      <div className="">
        <h1 data-aos="fade-right">Hi, my name is</h1>
      </div>
      <div>
        <h2 className="big-heading" data-aos="fade-right" data-aos-delay="100">
          Waheed Safiu
        </h2>
      </div>
      <div>
        <h3 id="stack">MERN, MEVN Web Developer.</h3>
      </div>
      <div data-aos="fade-right" data-aos-delay="200">
        <p>
          I'm a software engineer specializing in building and developing
          website and web base application. Currently, I'm focused on learning
          new language like <mark>JAVA</mark>, <mark>Python</mark>,{" "}
          <mark>C#</mark>, <mark>C++</mark>
        </p>
      </div>

      <div data-aos="fade-right" data-aos-delay="200">
        <a
          className="email-link"
          href="https://drive.google.com/file/d/1jemQatMndXplBT7QSL0strUrGv232DhR/view?usp=drivesdk"
          target="_blank"
          rel="noreferrer"
          style={{ borderRadius: "var(--border-radius)" }}
        >
          Check out my Resume!
        </a>
      </div>
    </section>
  );
}

export default Intro;
