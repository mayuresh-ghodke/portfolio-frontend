import React, { useEffect, useState } from "react";
import PublicExperienceCard from "../components/PublicExperienceCard.jsx";
import { viewExperience } from "../services/public-service.js";
import "../styles/Experience.css";
import Loading from "../components/Loading";

export default function Experience() {

  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await viewExperience(); 
        setIsLoading(false);

        // Filter visible + then sort (latest first)
        const visibleExperiences = data
          .filter((exp) => !exp.hidden)
          .sort(
            (a, b) =>
              new Date(b.endedOn || "2100-01-01") -
              new Date(a.endedOn || "2100-01-01")
          );

        setExperiences(visibleExperiences);

      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {experiences.length !==0 ? <>
        <div className="container mt-2 mb-2">

      <div className="row">
        <div className="col-md-12 text-center">
          <h1 className="content-title">Experience</h1>
        </div>
      </div>

      <div className="row g-4 justify-content-center">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {experiences.map((exp) => (
              <div key={exp.expId} className="col-md-10 col-lg-10 mt-3">
                <PublicExperienceCard experience={exp} />
              </div>
            ))}
          </>
        )}
      </div>

    </div>
      </> : <></>}
    </>
  );
}
