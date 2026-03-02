import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import logo from "../../public/logo.jpeg"; // عدل المسار حسب مكان الصورة

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // validation
  const validate = () => {
    const newErrors = {};

    if (!values.email.includes("@"))
      newErrors.email = "البريد الإلكتروني غير صالح";

    if (!values.password.trim())
      newErrors.password = "كلمة المرور مطلوبة";

    return newErrors;
  };

  // change inputs
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      navigate("/step1");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="logo" className="w-20 mb-2" />
          <h1 className="text-xl font-semibold text-blue-600">
            Stomach Support
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={values.email}
                onChange={handleChange}
                className={`w-full pl-12 py-3 rounded-xl bg-gray-100 outline-none border ${errors.email
                    ? "border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                  }`}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Your Password"
                value={values.password}
                onChange={handleChange}
                className={`w-full pl-12 pr-12 py-3 rounded-xl bg-gray-100 outline-none border ${errors.password
                    ? "border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                  }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-full font-semibold text-lg hover:bg-blue-600 transition"
          >
            Login
          </button>

          {/* Forgot */}
          <p className="text-center text-sm text-gray-400 cursor-pointer">
            ?Forgot password
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full border rounded-full py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
            />
            Sign in with Google
          </button>

          {/* Register */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 font-semibold">
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;