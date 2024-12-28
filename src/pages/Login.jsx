import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import "./Login.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const { apiFetch, setToken } = useApi();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await apiFetch("api/users/signin", "POST", {
          body: {
            email: formData.email,
            password: formData.password,
          },
        });

        setToken(response.token);

        const loginSuccess = true;

        if (loginSuccess) {
          navigate("/home");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex-1 flex justify-center items-center">
        <div className="flex justify-center items-center w-full max-w-screen-xl px-4 py-12">
          <div className="w-[500px] bg-[#001d5b] rounded-lg p-8 mt-16">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white mb-1">
                Welcome back!
              </h2>
              <p className="text-gray-300 text-sm">
                Enter your Credentials to access your account
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-white mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-white rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-2 border-red-500" : ""
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="text-sm text-white">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 bg-white rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-2 border-red-500" : ""
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-white">
                  Remember for 15 days
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 border-0"
              >
                Login
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-gray-600 w-full"></div>
                <span className="bg-[#001d5b] text-white px-4 text-sm absolute">
                  OR
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 bg-white text-gray-700 rounded-lg py-2.5 px-4 hover:bg-gray-100 border-0"
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Sign in with Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 bg-white text-gray-700 rounded-lg py-2.5 px-4 hover:bg-gray-100 border-0"
                >
                  <img
                    src="https://www.apple.com/favicon.ico"
                    alt="Apple"
                    className="w-5 h-5"
                  />
                  Sign in with Apple
                </button>
              </div>

              <p className="text-center text-white text-sm mt-4">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
