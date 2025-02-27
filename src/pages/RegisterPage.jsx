import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create an Account
        </h1>
        <p className="text-center text-gray-600 mb-4">
        Enter your details to sign up.
        </p>

        <RegisterForm />

        <p className="text-center text-gray-600 mt-4">
        Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
          Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
