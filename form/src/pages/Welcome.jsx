import React from "react";
import { useLocation } from "react-router-dom";

function Welcome() {
  const location = useLocation();
  const doctorName = location.state?.doctorName || "Doctor";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef3f8] p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-12 text-center">

        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome Doctor {doctorName} 👨‍⚕️
        </h1>

        <p className="text-gray-600 text-lg">
          We're glad to have you with us.
        </p>

      </div>
    </div>
  );
}

export default Welcome;
