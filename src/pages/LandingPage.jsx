import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Simple Expense Tracker</h1>
      <p className="text-lg text-gray-600 mb-6">
        Управлявай бюджета си лесно! Следи разходите и приходите си с удобен и бърз интерфейс.
      </p>
      <div className="space-x-4">
        <Link to="/register" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600">
          Регистрация
        </Link>
        <Link to="/login" className="bg-gray-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800">
          Вход
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
