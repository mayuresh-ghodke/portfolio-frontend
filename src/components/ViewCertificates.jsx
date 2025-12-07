import { useEffect, useState } from "react";
import { publicAxios, BASE_URL } from "../services/public-helper";
import "../styles/ViewCertificates.css";
import { FaFileAlt } from "react-icons/fa";
import Loading from "../components/Loading";

export default function ViewCertificates() {

  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await publicAxios.get("/files/get/by-type/Certificate");
        setIsLoading(false);
        setCertificates(res.data || []);

      } catch (error) {
        setCertificates([]);
      }
    };
    fetchCertificates();
  }, []);

  // Get thumbnail image based on file type
  const getThumbnail = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "webp"].includes(extension)) {
      return `${BASE_URL}${fileName}`; // direct image preview
    }

    // Default PDF icon
    return `${BASE_URL}${fileName}`;
  };

  const openCertificate = (fileName) => {
    const url = `${BASE_URL}${fileName}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container">

      <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="mb-5 content-title">Certificates</h1>
          </div>
        </div>

      {certificates.length === 0 && (
        <p className="no-certificates text-center">No certificates available.</p>
      )}

      <div className="row">
        {isLoading ? <Loading /> : <>
          {certificates.map((cert) => (
          <div key={cert.fileId} className="col-md-6 mb-4">
            <div className="certificate-card">

              {/* Thumbnail */}
              {/* <img
                src={getThumbnail(cert.fileName)}
                alt="Certificate"
                className="certificate-thumbnail"
                onClick={() => openCertificate(cert.fileName)}
              /> */}

              {/* Description */}
              <h4 className="certificate-description mt-2">
                {cert.description}
              </h4>

              {/* View Button */}
              <button
                className="btn btn-warning mt-4"
                onClick={() => openCertificate(cert.fileName)}
              >
               <FaFileAlt /> View
              </button>
            </div>
          </div>
        ))}
        </>}
      </div>
    </div>
  );
}
