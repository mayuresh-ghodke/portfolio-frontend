import React, { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { myAxios } from '../services/admin-helper.js';
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/ProfileSection.css";
import "../styles/AdminInputForm.css";

function AddEducation() {

    const [formData, setFormData] = useState({
        degreeName: "",
        schoolName: "",
        place: "",
        universityName:"",
        passingYear:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!formData.degreeName || !formData.schoolName) {
            Swal.fire({
                icon: "warning",
                title: "Warning!",
                text: "Please fill all the required information.",
                confirmButtonText: "OK",
            });
            return;
        }

        const myData = {
            degreeName: formData.degreeName,
            schoolName: formData.schoolName,
            place: formData.place,
            universityName:formData.universityName,
            passingYear:formData.passingYear
        };

        myAxios
            .post("/admin/education/save", myData)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Education information has been submitted successfully.",
                    confirmButtonText: "OK",
                });
                setFormData({
                    degreeName: "",
                    schoolName: "",
                    universityName: "",
                    place:"",
                    passingYear:""
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Information not saved. Something went wrong.",
                    confirmButtonText: "OK",
                });
                console.error("Error saving educational data:", error);
            });
    };
    return (
        <>
            <div className="p-0 bg-light">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="container mt-4">
                            <div className="row">
                                <div className="col-md-12 mx-auto">
                                    <div className="card p-4 shadow">
                                        <div className="">
                                            <h3 className="text-dark">Education</h3>
                                        </div>
                                        <form className="form" onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <label className="admin-form-label">Degree Name *</label>
                                                            <input
                                                                type="text"
                                                                className="admin-form-control"
                                                                placeholder="Enter degree name"
                                                                name="degreeName"
                                                                value={formData.degreeName}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label className="admin-form-label">School/College Name *</label>
                                                            <input
                                                                type="text"
                                                                className="admin-form-control"
                                                                placeholder="Enter school/college name"
                                                                name="schoolName"
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <label className="admin-form-label">University Name *</label>
                                                            <input
                                                                type="text"
                                                                className="admin-form-control"
                                                                placeholder="Enter university name"
                                                                name="universityName"
                                                                value={formData.universityName}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label className="admin-form-label">Place *</label>
                                                            <input
                                                                type="text"
                                                                className="admin-form-control"
                                                                placeholder="Enter place"
                                                                name="place"
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <label className="admin-form-label">Passing Year *</label>
                                                            <input
                                                                type="text"
                                                                className="admin-form-control"
                                                                placeholder="Enter passing year"
                                                                name="passingYear"
                                                                value={formData.passingYear}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-3 text-center">
                                                    <button type="submit" className="btn btn-primary d-flex d-block">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddEducation;
