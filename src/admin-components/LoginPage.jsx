import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { myAxios } from '../services/admin-helper';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';   
import "../styles/AdminInputForm.css";

function LoginPage() {

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const params = new URLSearchParams();
  params.append("username", loginData.username);
  params.append("password", loginData.password);

  try {
    await myAxios.post('/login', params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true
    }
  );

  sessionStorage.setItem("logged_in", "true");
  
  Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => navigate('/admin/dashboard'));

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Invalid username or password.',
    });
  }
};



  return (
    <div className="login-wrapper">
		<div className="card login-card shadow-lg p-4">
        	<h3 className="text-center mb-4 fw-bold text-primary">Admin Login</h3>
			<form onSubmit={handleSubmit}>

			<div className="mb-3">
				<label className="admin-form-label fw-semibold">Username</label>
				<input
				type="text"
				name="username"
				className="admin-form-control form-control-lg"
				placeholder="Enter your username"
				value={loginData.username}
				onChange={handleChange}
				/>
			</div>

			<div className="mb-3">
				<label className="admin-form-label">Password</label>
				<input
				type="text"
				name="password"
				className="admin-form-control form-control-lg"
				placeholder="Enter password"
				value={loginData.password}
				onChange={handleChange}
				/>
			</div>
 
			{/* <p><sub>
				<a href='/forgot-password'>Forgot Password ?</a>
			</sub></p> */}

			<button type="submit" className="btn btn-primary btn-lg w-100 mt-2">
				Login
			</button>

			</form>
      	</div>
    </div>
);
}

export default LoginPage;
