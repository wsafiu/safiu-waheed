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
