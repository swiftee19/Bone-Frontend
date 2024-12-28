import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useApi } from "../context/ApiContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { apiFetch, setToken } = useApi();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationRules = {
    name: (value) => {
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      if (value.trim().length > 50)
        return "Name must be less than 50 characters";
      if (!/^[a-zA-Z\s]*$/.test(value))
        return "Name can only contain letters and spaces";
      return "";
    },

    email: (value) => {
      if (!value) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Please enter a valid email address";
      return "";
    },

    password: (value) => {
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      if (!/[A-Z]/.test(value))
        return "Password must contain at least one uppercase letter";
      if (!/[a-z]/.test(value))
        return "Password must contain at least one lowercase letter";
      if (!/\d/.test(value)) return "Password must contain at least one number";
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
        return "Password must contain at least one special character";
      return "";
    },

    terms: (value) =>
      !value ? "You must accept the terms and conditions" : "",
  };

  const validateField = (name, value) => {
    const validationRule = validationRules[name];
    if (!validationRule) return "";
    return validationRule(value);
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(values).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, values[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({
        ...acc,
        [key]: true,
      }),
      {}
    );
    setTouched(allTouched);

    const isValid = validateForm();
    if (isValid) {
      try {
        // Submit form to backend
        const data = await apiFetch("api/users/signup", "POST", {
          body: {
            name: values.name,
            email: values.email,
            password: values.password,
          },
        });

        // Save token to api context
        setToken(data.token);

        navigate("/questionnaire");
      } catch (error) {
        console.error("Submission error:", error);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex justify-center items-center">
        <div className="flex justify-center items-center w-full max-w-screen-xl px-4 py-12">
          <div className="w-[500px] bg-[#001d5b] rounded-lg p-8 mt-16">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-1">
                Get Started Now
              </h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 bg-[#001d5b] border ${
                    touched.name && errors.name
                      ? "border-red-500"
                      : "border-gray-600"
                  } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your name"
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

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
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 bg-[#001d5b] border ${
                    touched.email && errors.email
                      ? "border-red-500"
                      : "border-gray-600"
                  } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your email"
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-white mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 bg-[#001d5b] border ${
                    touched.password && errors.password
                      ? "border-red-500"
                      : "border-gray-600"
                  } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your password"
                />
                {touched.password && errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={values.terms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-white">
                  I agree to the terms & policy
                </label>
              </div>
              {touched.terms && errors.terms && (
                <p className="mt-1 text-sm text-red-400">{errors.terms}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  isSubmitting
                    ? "bg-green-700"
                    : "bg-green-600 hover:bg-green-700"
                } text-white font-medium py-2.5 rounded-lg transition-colors duration-200`}
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
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
                  className="flex items-center justify-center gap-2 bg-transparent text-white rounded-lg py-2.5 px-4 hover:bg-opacity-10 hover:bg-white border border-gray-600"
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
                  className="flex items-center justify-center gap-2 bg-transparent text-white rounded-lg py-2.5 px-4 hover:bg-opacity-10 hover:bg-white border border-gray-600"
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
                Have an account?{" "}
                <Link to="/" className="text-blue-400 hover:text-blue-300">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
