import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import logo from "../../public/logo.jpeg";

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // validation
  const validate = () => {
    const newErrors = {};

    if (!values.username.trim())
      newErrors.username = "Username مطلوب";

    if (!values.email.includes("@"))
      newErrors.email = "Email غير صحيح";

    if (values.password.length < 6)
      newErrors.password = "Password لازم 6 حروف على الأقل";

    return newErrors;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      console.log(values);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} className="w-20 mb-2" />
          <h1 className="text-xl font-semibold text-blue-600">
            Stomach Support
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="text"
                name="username"
                placeholder="Enter Your Username"
                value={values.username}
                onChange={handleChange}
                className={`w-full pl-12 py-3 rounded-xl bg-gray-100 outline-none border ${
                  errors.username
                    ? "border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
              />
            </div>

            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username}
              </p>
            )}
          </div>

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
                className={`w-full pl-12 py-3 rounded-xl bg-gray-100 outline-none border ${
                  errors.email
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
                placeholder="Enter Your password"
                value={values.password}
                onChange={handleChange}
                className={`w-full pl-12 pr-12 py-3 rounded-xl bg-gray-100 outline-none border ${
                  errors.password
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

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-full font-semibold text-lg hover:bg-blue-600 transition"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 font-semibold">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;