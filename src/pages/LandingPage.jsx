import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Simple Expense Tracker 💰</h1>
        <p className="text-lg mb-6">
          Manage your expenses with ease! Add income and expenses, analyze your
          budget with charts, and track your finances effectively.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left mb-8">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">📊 Charts & Statistics</h3>
            <p className="text-sm">Monitor your budget with visual reports.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">📂 Expense Categorization</h3>
            <p className="text-sm">Group your expenses into categories.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">🔒 Secure Data Storage </h3>
            <p className="text-sm">
              Your financial data is safely stored and protected.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition"
        >
          🚀 Get Started Now
        </button>

        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in here
          </span>
        </p>
      </div>
    </div>
  );
}
