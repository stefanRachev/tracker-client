import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-green-500 to-blue-400 p-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white/90 backdrop-blur-sm h-fit"> 
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Create an Account
        </h1>
        <p className="text-center text-gray-600 mb-2">
          Enter your details to sign up.
        </p>

        <RegisterForm />

        <p className="text-sm text-gray-500 mt-2 text-center">
          We recommend using a combination of uppercase and lowercase letters,
          numbers, and special characters for a more secure password.
        </p>

        <p className="text-center text-gray-600 mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
