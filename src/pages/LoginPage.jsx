import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-500 to-blue-400 p-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white/90 backdrop-blur-sm h-fit">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-2">
          Please enter your credentials to log in
        </p>

        <LoginForm />

        <p className="text-center text-gray-600 mt-2">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline text-sm sm:text-base"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
