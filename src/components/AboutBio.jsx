import { motion } from "framer-motion";
import "../styles/AboutBio.css";
import "../styles/App.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export default function AboutBio({ aboutData }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className=""
    >

      {aboutData.aboutBio ? (
        <div className="about-bio premium-quote">
            <FaQuoteLeft className="big-quote left" /><p
          className="text-gray-300 bio-text"
          dangerouslySetInnerHTML={{ __html: aboutData.aboutBio }}
        ></p><FaQuoteRight className="big-quote right" />
        </div>
      ) : (
        <></>
      )}
    </motion.div>
  );
}
