// import React, { useState, useEffect } from "react";
// import { myAxios } from "../services/public-helper.js";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// export default function ViewFiles() {
    
//   const [files, setFiles] = useState([]);

//   // Fetch files by type
//   const fetchFiles = async () => {

//     try {
//       const response = await myAxios.get(`/files/get/all`);
//       setFiles(response.data);
//     } catch (error) {
//       setFiles([]);
//       };
//     }
//   };

//   return (
//     <>
//       <div className="p-0 bg-light">
//           </div>

//           {/* Main */}
//           <div className="col-md-10">
//             <div className="container mt-4">
//               <div className="card p-4 shadow">

//                 <h3 className="fw-bold mb-4">View Files</h3>

//                 {/* File Type Dropdown */}
//                 <div className="row mb-4">
//                   <div className="col-md-4">
//                     <label className="form-label">Select File Type</label>
//                     <select
//                       className="form-control"
//                       value={fileType}
//                       onChange={(e) => {
//                         setFileType(e.target.value);
//                         fetchFiles(e.target.value);
//                       }}
//                     >
//                       <option value="">Select</option>
//                       <option value="Certificate">Certificate</option>
//                       <option value="Resume">Resume</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Files Table */}
//                 {files.length > 0 ? (
//                   <table className="table table-bordered table-striped">
//                     <thead className="table-dark">
//                       <tr>
//                         <th>ID</th>
//                         <th>Description</th>
//                         <th>File Type</th>
//                         <th>Hidden?</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {files.map((file) => (
//                         <tr key={file.fileId}>
//                           <td>{file.fileId}</td>
//                           <td>{file.fileDescription}</td>
//                           <td>{file.fileType}</td>
//                           <td>
//                             {file.hidden ? (
//                               <span className="badge bg-danger">Hidden</span>
//                             ) : (
//                               <span className="badge bg-success">Visible</span>
//                             )}
//                           </td>

//                           <td>
//                             {/* View Button */}
//                             <a 
//                                 href={`http://localhost:8030${file.fileName}`}
//                                 target="_blank"
//                                 className="btn btn-sm btn-info"
//                               >
//                                 View File
//                               </a>

//                             {/* Hide/Unhide Button */}
//                             <button
//                               className="btn btn-sm btn-warning me-2"
//                               onClick={() => toggleHide(file.fileId, file.hidden)}
//                             >
//                               {file.hidden ? "Unhide" : "Hide"}
//                             </button>

//                             {/* Delete Button */}
//                             <button
//                               className="btn btn-sm btn-danger"
//                               onClick={() => deleteFile(file.fileId)}
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   fileType && (
//                     <h5 className="text-center mt-4 text-muted">
//                       No files found for '{fileType}'
//                     </h5>
//                   )
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
