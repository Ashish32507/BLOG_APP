import React from "react";
import { useSelector } from "react-redux";

function About() {
  const { user } = useSelector((store) => store.user);
  console.log(user);

  return (
    <div className="max-w-6xl my-4 p-4 space-y-5 bg-white shadow-lg rounded-lg">
      {/* Title Section */}
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center border-b pb-4">
        About Me
      </h1>

      {/* Introduction Section */}
      <p className="text-lg leading-relaxed text-gray-700">
        Hi, I’m{" "}
        <strong className="text-blue-600 font-semibold hover:scale-105 transition-transform duration-300">
          {user?.name}
        </strong>
        , a proficient full-stack developer with a robust skill set spanning
        both front-end and back-end technologies. With a passion for building
        dynamic, responsive, and user-friendly web applications, I excel in
        crafting seamless digital experiences.
      </p>

      {/* Technical Expertise Section */}
      <h2 className="font-semibold text-blue-600 text-2xl">
        Technical Expertise:
      </h2>
      <p className="text-base leading-relaxed text-gray-700">
        <strong>Front-End:</strong> Adept in modern JavaScript frameworks and
        libraries such as React.js, Angular, and Vue.js. Skilled in HTML5, CSS3,
        and responsive design principles to create intuitive and visually
        appealing interfaces.
        <br />
        <strong>Back-End:</strong> Proficient in server-side technologies
        including Node.js, Express.js, and Django. Experienced with database
        management using SQL and NoSQL databases like MySQL, PostgreSQL, and
        MongoDB.
        <br />
        <strong>DevOps:</strong> Knowledgeable in containerization and
        orchestration tools such as Docker and Kubernetes. Familiar with
        continuous integration and deployment (CI/CD) pipelines.
        <br />
        <strong>Cloud Services:</strong> Experience with cloud platforms like
        AWS, Azure, and Google Cloud, enabling scalable and reliable application
        deployment.
      </p>

      {/* Professional Highlights Section */}
      <h2 className="font-semibold text-blue-600 text-2xl">
        Professional Highlights:
      </h2>
      <p className="text-base leading-relaxed text-gray-700">
        Successfully developed and deployed numerous full-stack applications,
        demonstrating strong problem-solving skills and a keen eye for detail.
        Collaborated with cross-functional teams to deliver high-quality
        software solutions within tight deadlines. Continuously learning and
        adapting to emerging technologies and industry trends to stay ahead in
        the fast-evolving tech landscape.
      </p>

      {/* Personal Section */}
      <p className="text-base leading-relaxed text-gray-700">
        I am dedicated to leveraging my expertise to contribute to innovative
        projects and drive technological advancements. Whether working on
        front-end interfaces or back-end logic, I am passionate about delivering
        exceptional digital solutions that meet user needs and exceed client
        expectations.
      </p>

      {/* Personal Interests and Inspiration Section */}
      <h2 className="font-semibold text-blue-600 text-2xl">
        Personal Interests and Inspiration:
      </h2>
      <p className="text-base leading-relaxed text-gray-700">
        Beyond my professional achievements, I am a big fan of cricket and hold
        immense admiration for <strong>King Kohli.</strong> My favorite person
        and biggest inspiration is my twin brother,{" "}
        <strong>Ashish Kr Yadav.</strong> Their friendly rivalry and deep bond
        have significantly shaped my journey. Ashish is not only a great
        competitor but also a steadfast friend, constantly motivating me to
        strive for excellence.
      </p>
    </div>
  );
}

export default About;
