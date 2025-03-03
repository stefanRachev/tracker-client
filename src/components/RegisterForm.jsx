import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateFields } from "../utils/formValidation";

const API_URL = import.meta.env.VITE_API_URL;

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        if (data.errors) {
          setErrorMessage(data.errors);
        } else {
          setErrorMessage({ general: data.message || "Registration failed." });
        }
        return;
      }
      const responseData = await response.json();
      console.log("Registration successful:", responseData);

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrorMessage({});
      setRegistrationSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error(error.message);
      setErrorMessage({ general: "An error occurred during registration." });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-center">Registration</h2>
      {registrationSuccess && (
        <div className="text-green-500 text-sm mb-4 text-center">
          Registration successful! Redirecting...
        </div>
      )}
      {errorMessage.general && (
        <div className="text-red-500 text-sm mb-4 text-center">
          {errorMessage.general}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nickname or username"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errorMessage.username && (
            <div className="text-red-500 text-sm mt-2">
              {errorMessage.username}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errorMessage.email && (
            <div className="text-red-500 text-sm mt-2">
              {errorMessage.email}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? (
                <span className="text-gray-500">🙈</span>
              ) : (
                <span className="text-gray-500">👁️</span>
              )}
            </button>
          </div>
          {errorMessage.password && (
            <div className="text-red-500 text-sm mt-2">
              {errorMessage.password}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm password"
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showConfirmPassword ? (
                <span className="text-gray-500">🙈</span>
              ) : (
                <span className="text-gray-500">👁️</span>
              )}
            </button>
          </div>
          {errorMessage.confirmPassword && (
            <div className="text-red-500 text-sm mt-2">
              {errorMessage.confirmPassword}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-blue-400 text-white p-2 rounded-md hover:from-blue-500 hover:to-green-500 transition-colors duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
