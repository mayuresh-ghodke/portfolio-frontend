
import { useTypewriter, Cursor } from "react-simple-typewriter";
import "react-social-icons/facebook";
import "react-social-icons/linkedin";
import "react-social-icons/instagram";
import "react-social-icons/github";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { info } from "../User";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import ContactForm from "./ContactForm";

import "../styles/Homepage.css";
import "../styles/App.css";
import { viewAboutInfo, viewProfile } from "../services/public-service";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Experience from "./Experience";

// ----------------------------------------------
// Animation Variants
// ----------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } }
};

const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function Home() {

  const [aboutData, setAboutData] = useState({
    aboutTitle: "Java Developer"
  });

  const [profile, setProfile] = useState({
    firstName:"Mayuresh",
    lastName:"",
    linkedInUrl:"https://linkedin.com/in/mayuresh-ghodke-72704027b",
    githubUrl:"https://github.com/mayuresh-ghodke"
  });

  useEffect(() => {
    viewAboutInfo().then((res) => {
      if (res && res.data) {
        setAboutData(res.data);
      }
    });
    viewProfile().then((res) => {
      if(res){
        setProfile(res);
      };
    })
  }, []);

  const [text] = useTypewriter({
    words: [aboutData.aboutTitle],
    loop: true,
    typeSpeed: 140,
    delaySpeed: 1500
  });

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <motion.div
        className="container"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Social Icons (Stagger Animation) */}
        {/* <motion.div
          className="social-icons"
          variants={staggerParent}
          initial="hidden"
          animate="visible"
        >
          {["facebook", "linkedin", "instagram", "github"].map((item, i) => (
            <motion.div key={i} variants={staggerItem}>
              <SocialIcon
                className="icon"
                url={`https://www.${item}.com`}
                bgColor="#ff6347"
                fgColor="white"
              />
            </motion.div>
          ))}
        </motion.div> */}

        {/* Hero Text Section */}
        <motion.div
          className="col-md-8 mx-auto text-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <div className="introSection">
            <motion.h1
              style={{ fontSize: "64px", color: "#51f5f0ff" }}
              variants={fadeUp}
            >
              Hello, I'm <span style={{ color: "#ff6347" }}>{info.name}</span>
            </motion.h1>

            <motion.h3
              style={{ fontSize: "36px", color: "#51f5f0ff" }}
              variants={fadeUp}
            >
              I am <span style={{ color: "#0c73c8ff" }}>{text}</span>
              <Cursor />
            </motion.h3>

            <motion.p
              style={{
                color: "white",
                fontSize: "18px",
                marginTop: "20px"
              }}
              variants={fadeUp}
            >
              {aboutData.aboutBio}
            </motion.p>

            <div className="github-linkedin">

  <motion.a
    href={profile.githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="icon-btn"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    style={{color:"#51f5f0ff"}}
  >
    <FaGithub size={35} />
  </motion.a>

  <motion.a
    href={profile.linkedInUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="icon-btn linkedin"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    style={{color:"#51f5f0ff"}}
  >
    <FaLinkedin size={35} />
  </motion.a>

</div>


          </div>
        </motion.div>
      </motion.div>

      {/* ==================== ABOUT SECTION ==================== */}
      <motion.div
        className="container mt-1"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <About />
      </motion.div>

      {/* ==================== SKILLS SECTION ==================== */}
      <motion.div
        className="container"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Skills />
      </motion.div>

      {/* ==================== PROJECTS SECTION ==================== */}
      <motion.div
        className="container"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Projects />
      </motion.div>

      {/* ==================== EXPERIENCES SECTION ==================== */}
      <motion.div
        className="container"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Experience />
      </motion.div>

      {/* ==================== CONTACT SECTION ==================== */}
      <motion.div
        className="container text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="content-title">Contact Me</h1>

        <div className="mt-4">
          <h2>
            <strong>Get in Touch</strong>
          </h2>
          <h4>
            <strong>Fill The Form Below</strong>
          </h4>
        </div>

        <div className="col-md-8 mx-auto mt-4">
          <ContactForm />
        </div>
      </motion.div>
    </>
  );
}

export default Home;
