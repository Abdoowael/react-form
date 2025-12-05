import React, { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/WhatsApp Image 2025-11-29 at 21.04.03_645fc194.jpg"
import { useNavigate } from "react-router-dom";


function Form() {
    const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Validation Function
  const validate = () => {
    let newErrors = {};

    // ❌ NAME VALIDATION → Block numbers
    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    } else if (/\d/.test(values.name)) {
      newErrors.name = "Name cannot contain numbers";
    }

    // EMAIL
    if (!values.email.includes("@")) {
      newErrors.email = "Invalid email format";
    }

    // PASSWORD
    if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

  
    if (values.password !== values.confirm) {
      newErrors.confirm = "Passwords do not match";
    }

    return newErrors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
  navigate("/hello", { state: { patientName: values.name } });
}

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef3f8] p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">

        <img src={img1} alt="Logo" className="w-xl mx-auto mb-6" />

        <form onSubmit={handleSubmit} >

          {/* NAME INPUT */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="UserName"
              value={values.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl outline-none 
                focus:ring-2 
                ${errors.name 
                  ? "border-red-500 focus:ring-red-400" 
                  : "border-gray-300 focus:ring-blue-400"}`}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* EMAIL INPUT */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl outline-none 
                focus:ring-2 
                ${errors.email 
                  ? "border-red-500 focus:ring-red-400" 
                  : "border-gray-300 focus:ring-blue-400"}`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl outline-none 
                focus:ring-2 
                ${errors.password 
                  ? "border-red-500 focus:ring-red-400" 
                  : "border-gray-300 focus:ring-blue-400"}`}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-6">
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={values.confirm}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl outline-none 
                focus:ring-2 
                ${errors.confirm 
                  ? "border-red-500 focus:ring-red-400" 
                  : "border-gray-300 focus:ring-blue-400"}`}
            />

            {errors.confirm && (
              <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition"
          >
            Sign In
          </button>
        </form>

      


            <p className="mt-4 text-gray-600">
            Already Have An Account?
            <Link to="/login" className="text-blue-500 font-semibold ml-1">
                Login
            </Link>
            </p>

      </div>
    </div>
    
  )
  
}

export default Form