import { motion } from "framer-motion";
import "../styles/AboutDescriptionCard.css";
import "../styles/App.css";

export default function AboutDescriptionCard({ aboutData }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className=""
    >

      {aboutData.aboutInfo ? (
        <div
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: aboutData.aboutInfo }}
          style={{
            textAlign:"justify"
          }}
        ></div>
      ) : (
        <p className="text-gray-500">No description available</p>
      )}
    </motion.div>
  );
}
