import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { viewAllEducation, updateEducation, deleteEducation } from "../services/admin-service.js";
import "../styles/AdminInputForm.css";

function ViewEducation() {
  
  const [educationData, setEducationData] = useState([]);

  useEffect(() => {
    viewAllEducation()
      .then((data) => {
        const updatedData = data.map((item) => ({ ...item, isEditing: false }));
        setEducationData(updatedData);
      })
      .catch((error) => {
        console.log("Error while fetching details: ", error);
      });
  }, []);

  const handleEdit = (id) => {
    setEducationData((prev) =>
      prev.map((item) =>
        item.eduId === id ? { ...item, isEditing: true } : item
      )
    );
  };

  const handleCancel = (id) => {
    setEducationData((prev) =>
      prev.map((item) =>
        item.eduId === id ? { ...item, isEditing: false } : item
      )
    );
  };

  const handleSave = async (id) => {
    const updatedItem = educationData.find((item) => item.eduId === id);
    try {
      await updateEducation(id, updatedItem);
      setEducationData((prev) =>
        prev.map((item) =>
          item.eduId === id ? { ...updatedItem, isEditing: false } : item
        )
      );
      alert("Updated successfully!");
    } catch (err) {
      alert("Failed to update!");
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure to delete this entry?")){
      return;
    }
    else{
      try{
        setEducationData((prev) => prev.filter(item => item.eduId !== id));
        await deleteEducation(id);

        
        alert("Deleted Successfully.");
      }
      catch(err){
        alert("Not deleted.");
      }
    }
  }

  const handleChange = (id, field, value) => {
    setEducationData((prev) =>
      prev.map((item) => item.eduId === id ? { ...item, [field]: value } : item)
    );
  };

  return (
    <div className="p-0 bg-light">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>

        <div className="col-md-10">
          <div className="container-fluid mt-4">
            <Row>
              <Col md={12}>
                <div className="p-1">
                  <div className="card p-2">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h3 className="fw-bold mt-3">Education Details</h3>
                    </div>

                    <Table hover responsive className="align-middle mb-0">
                      <thead>
                        <tr>
                          <th>Sr.No</th>
                          <th>Degree</th>
                          <th>School / College</th>
                          <th>Place</th>
                          <th>University</th>
                          <th>Passing Year</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {educationData.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              List is empty
                            </td>
                          </tr>
                        ) : (
                          educationData.map((item, index) => (
                            <tr key={item.eduId}>
                              {item.isEditing ? (
                                <>
                                  <td>{index + 1}</td>

                                  <td>
                                    <Form.Control
                                      type="text"
                                      value={item.degreeName}
                                      onChange={(e) =>
                                        handleChange(
                                          item.eduId,
                                          "degreeName",
                                          e.target.value
                                        )
                                      }
                                      className="admin-form-control"
                                    />
                                  </td>

                                  <td>
                                    <Form.Control
                                      type="text"
                                      value={item.schoolName}
                                      onChange={(e) =>
                                        handleChange(
                                          item.eduId,
                                          "schoolName",
                                          e.target.value
                                        )
                                      }
                                      className="admin-form-control"
                                    />
                                  </td>

                                  <td>
                                    <Form.Control
                                      type="text"
                                      value={item.place}
                                      onChange={(e) =>
                                        handleChange(
                                          item.eduId,
                                          "place",
                                          e.target.value
                                        )
                                      }
                                      className="admin-form-control"
                                    />
                                  </td>

                                  <td>
                                    <Form.Control
                                      type="text"
                                      value={item.universityName}
                                      onChange={(e) =>
                                        handleChange(
                                          item.eduId,
                                          "universityName",
                                          e.target.value
                                        )
                                      }
                                      className="admin-form-control"
                                    />
                                  </td>

                                  <td>
                                    <Form.Control
                                      type="text"
                                      value={item.passingYear}
                                      onChange={(e) =>
                                        handleChange(
                                          item.eduId,
                                          "passingYear",
                                          e.target.value
                                        )
                                      }
                                      className="admin-form-control"
                                    />
                                  </td>

                                  <td>
                                    <Button
                                      variant="success"
                                      size="sm"
                                      className="me-2"
                                      onClick={() => handleSave(item.eduId)}
                                    >
                                      Save
                                    </Button>

                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      onClick={() => handleCancel(item.eduId)}
                                    >
                                      Cancel
                                    </Button>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>{index + 1}</td>
                                  <td>{item.degreeName}</td>
                                  <td>{item.schoolName}</td>
                                  <td>{item.place}</td>
                                  <td>{item.universityName}</td>
                                  <td>{item.passingYear}</td>

                                  <td>
                                    <Button
                                      variant="primary"
                                      size="sm"
                                      className="me-2"
                                      onClick={() => handleEdit(item.eduId)}
                                    >
                                      Update
                                    </Button>

                                    <Button
                                      variant="danger"
                                      size="sm"
                                      onClick={()=>handleDelete(item.eduId)}
                                    >
                                      Delete
                                    </Button>
                                  </td>
                                </>
                              )}
                            </tr>
                          ))
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEducation;
