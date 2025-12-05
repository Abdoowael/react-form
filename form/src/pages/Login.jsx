import React from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/WhatsApp Image 2025-11-29 at 21.04.03_645fc194.jpg"
import { useNavigate } from "react-router-dom";

import { useState } from "react";

function Login() {
        const navigate = useNavigate();
    
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!values.email.includes("@")) newErrors.email = "Invalid email";
    if (!values.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let err = validate();
    setErrors(err);


if (Object.keys(err).length === 0) {
  navigate("/welcome", { state: { doctorName: values.email } });
}


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef3f8] p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">

        <img src={img1} className="w-xl mx-auto mb-6" />

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-xl"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-xl"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <button className="w-full py-3 bg-blue-500 text-white rounded-full">
            Login
          </button>

        </form>
        
      <p className="text-center mt-2.5">

        <Link
        to="/"
        className="mt-4 text-blue-600 font-medium hover:underline"
        >
        Back To Create Account
        </Link>
            </p>
            

      </div>

    </div>
  );
}

export default Login;
