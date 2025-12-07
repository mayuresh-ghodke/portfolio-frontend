import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/AdminInputForm.css";
import { publicAxios } from "../services/public-helper";

function ForgotPassword() {

  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
  
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      await publicAxios.post("/password/forgot/send-otp", { email: formData.email });
      Swal.fire("OTP Sent!", "Check your email for the OTP.", "success");
      setStep(2);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to send OTP", "error");
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      await publicAxios.post("/password/forgot/verify-otp", { email: formData.email, otp: formData.otp });
      Swal.fire("OTP Verified!", "You can now enter new password.", "success");
      setStep(3);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Invalid OTP", "error");
    }
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      await publicAxios.post("/password/forgot/update-password", {
        email: formData.email,
        newPassword: formData.newPassword,
      });
      Swal.fire("Success!", "Password updated successfully.", "success");
      setFormData({ email: "", otp: "", newPassword: "" });
      setStep(1);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to update password", "error");
    }
  };

  return (
            <div className="container p-4 card">
                <h3 className="text-dark mb-4">Forgot Password</h3>

                {step === 1 && (
                    <form onSubmit={handleSubmitEmail}>
                      <div className="mb-3 text-center">
                        <div className="col-md-6 justify-content-center">
                          <label className="admin-form-label">Enter your email *</label>
                          <input
                            type="email"
                            className="admin-form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email to get an otp"
                            required
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary px-4">
                          Send OTP
                        </button>
                      </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmitOtp}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="admin-form-label">Enter OTP *</label>
                                <input
                                    type="text"
                                    className="admin-form-control"
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    placeholder="Enter received otp"
                                    required
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success px-4">
                            Verify OTP
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleSubmitNewPassword}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="admin-form-label">Enter New Password *</label>
                                <input
                                    type="password"
                                    className="admin-form-control"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    placeholder="Enter new password (min 8 characters)"
                                    required
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success px-4">
                            Update Password
                            </button>
                        </div>
                    </form>
                  )}
                </div>
    );
}

export default ForgotPassword;
