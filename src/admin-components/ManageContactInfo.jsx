import React, { useState } from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import { myAxios } from '../services/helper.js';
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ManageContactInfo() {
    const [formData, setFormData] = useState({
        aboutTitle: "",
        aboutInfo: "",
        imgUrl: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // ReactQuill handler (don't change variable)
    const handleAboutInfoChange = (value) => {
        setFormData({ ...formData, aboutInfo: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.aboutTitle || !formData.aboutInfo) {
            Swal.fire({
                icon: "warning",
                title: "Warning!",
                text: "Please fill all the required information.",
                confirmButtonText: "OK",
            });
            return;
        }

        const myData = {
            aboutTitle: formData.aboutTitle,
            aboutInfo: formData.aboutInfo,
            aboutUrl: formData.aboutUrl
        };

        myAxios
            .post("/about/save", myData)
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "About information details has been submitted successfully.",
                    confirmButtonText: "OK",
                });
                setFormData({
                    aboutInfo: "",
                    aboutTitle: "",
                    aboutUrl: ""
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Information not saved. Something went wrong.",
                    confirmButtonText: "OK",
                });
                console.error("Error saving my profile data:", error);
            });
    };

    // ----- ReactQuill Toolbar -----
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold", "italic", "underline", "strike",
        "align",
        "list", "bullet",
        "blockquote", "code-block",
        "link", "image"
    ];

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
                                        <div className="d-flex justify-content-between align-items-center mb-5">
                                            <h3 className="fw-bold">About</h3>
                                        </div>
                                        <form className="form" onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h5 className="mb-3 font-weight-bold">About Information</h5>

                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <label className="form-label">About Title *</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter about title"
                                                                name="aboutTitle"
                                                                value={formData.aboutTitle}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label className="form-label">About Image *</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                name="imgUrl"
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row mb-3">
                                                        <div className="col-md-12">
                                                            <label className="form-label">About Information *</label>

                                                            <ReactQuill
                                                                theme="snow"
                                                                value={formData.aboutInfo}
                                                                onChange={handleAboutInfoChange}
                                                                modules={modules}
                                                                formats={formats}
                                                                placeholder="Enter detailed info..."
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

export default ManageContactInfo;
