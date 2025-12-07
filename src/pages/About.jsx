import "../styles/App.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useState, useEffect } from "react";
import { viewAboutInfo } from "../services/public-service";
import AboutDescriptionCard from "../components/AboutDescriptionCard";
import "../styles/About.css";
import AboutBio from "../components/AboutBio";
import Education from "./Education";


const About = () => {

  const [aboutData, setAboutData] = useState({
    aboutTitle: "Loading...",
    aboutInfo: "Loading...",
  });

  useEffect(() => {
    viewAboutInfo().then((res) => {
      if (res && res.data) {
        setAboutData(res.data);
      } else {
        // Handle 404 from backend
        setAboutData({
          aboutTitle: "Mayuresh",
          aboutInfo: "Currently I have not added About details yet.",
        });
      }
    });
  }, []);

  const [text] = useTypewriter({
    words: [aboutData.aboutTitle || ""],
    loop: true,
    typeSpeed: 140,
    deleteSpeed: 20,
    delaySpeed: 1000,
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="mt-1 mb-5 content-title">About - Who I'm?</h1>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6 text-end">
              <Education />
          </div>
          <div className="col-md-6 text-end">
            <img
                    className="img-fluid rounded-3 shadow-lg"
                    src={aboutData.imgUrl ? `http://localhost:8030${aboutData.imgUrl}` : "about-background.jpg"}
                    alt="About"
                    style={{
                    maxHeight: "250px",
                    objectFit: "cover",
                    border: "2px solid #1f2937",
                    }}
                />
          </div>
        </div>

        <div className="row align-items-center mt-4">
          <div
            className="col-md-12 bg-light p-4"
            style={{ borderRadius: "30px" }}
          >
            <div className="text-justify text-md-left">
              <h3 className=" mt-3 mb-3" style={{color:"#51f5f0ff"}}>
                Hello! I am {text}
                <Cursor />
              </h3>

              <div className="mt-3">
                <AboutDescriptionCard aboutData={aboutData}/>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center mt-3">
          <div className="col-12 col-md-12 text-center">
              <AboutBio aboutData={aboutData}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
