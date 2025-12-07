import { useEffect, useState } from "react";
import { publicAxios, BASE_URL } from "../services/public-helper.js";
import Swal from "sweetalert2";
import { FaFileAlt } from "react-icons/fa";

export default function DownloadResume() {
    
    const [resume, setResume] = useState(null);
    const [isResumeOpened, setIsResumeOpened] = useState(false);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await publicAxios.get("/files/get/by-type/Resume");
                if (res.data.length > 0) {
                    setResume(res.data[0]);
                } else {
                    setResume(null);
                }
            } catch (error) {
                setResume(null);
            }
        };
        fetchResume();
    }, []);

    const downloadResume = () => {
        if (!resume) {
            Swal.fire({
                icon: "info",
                title: "Not Found",
                text: "Resume is not available to download.",
            });
            return;
        }

        // Backend returns: fileName = "/uploads/xxx.pdf"
        const url = `${BASE_URL}${resume.fileName}`;

        // const link = document.createElement("a");
        // link.href = url;
        // link.download = resume.originalFileName;
        // link.click();
        window.open(url, "_blank");
        setIsResumeOpened(true);
        return;
    };

    return (
        <>
            <button
                className="btn"
                onClick={()=> window.open(resume, "_blank")}
                style={{
                    backgroundColor:"#f77f00",
                    fontWeight:"bold",
                    color:"white",
                    borderRadius:"20px"
                }}
            >
               <FaFileAlt size={16} /> My Resume 
            </button>
        </>
    );
}
