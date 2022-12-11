import "../css/about.css";

function About() {
  return (
    <section id="about" className="about" data-aos="fade-up">
      <h2 className="number-heading">About Me</h2>
      <div className="inner">
        <div className="about__text">
          <div>
            <p>
              Hello! My name is Waheed Safiu, <br />
              I'm Motivated software engineering studies Computer Science at the
              prestigeous University of Ibadan and I enjoy programming and
              anything related to Computer. My interest is in Software
              Engineering started back in 2019 when I decided to try and learn
              Web development from D.E Proficient Software at Polytechnics
              Ibadan.
            </p>

            <p>
              Fast-forward to today, and I've had the priviledge of learning
              different language like <span>JavaScript</span>, <span>Java</span>
              , <span>C#</span>, <span>Phython</span> and JavaScript framework
              like <span>ReactJS</span>, <span>VueJS</span>, <span>NuxtJS</span>
              which I hope will be useful for different project in the future
            </p>

            <p>Here are the few technologies I have work with</p>

            <ul className="skill__list">
              <li>JavaScript</li>
              <li>React</li>
              <li>Vue</li>
              <li>Nodejs</li>
              <li>Java</li>
              <li>C#</li>
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
                  srcset="/profile.png"
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
