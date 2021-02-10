import { Link } from "react-router-dom";
import "../Styles/About.css";

const About = () => {
  return (
    <div className="containing">
      <div className="about">
        <h2>About The Application</h2>
        <p>
          This application was designed as my final project for the Monsh
          University Coding Bootcamp.
        </p>
        <p>
          If you'd like to learn more about this project, do please view the
          project's
          <a className="git-link" href="https://github.com/avvisingh/In-Sync">
            {" "}
            Github repo.
          </a>
        </p>
        <p>
          If you're interested in viewing my other project's please head to my{" "}
          <a className="git-link" href="https://github.com/avvisingh">
            {" "}
            Github page.
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
