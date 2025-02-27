import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-blue-500 p-4 md:p-6 lg:p-8 xl:p-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        <div className="text-white text-2xl font-bold">Expense Tracker</div>
        <button
          className="lg:hidden text-white"
          onClick={toggleMenu}
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <nav
          className={`absolute top-16 left-0 w-full bg-blue-500 lg:static lg:flex lg:items-center lg:space-x-6 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <NavLink
            to="/"
            className="block py-2 px-4 text-white hover:bg-blue-600"
          >
            Home
          </NavLink>
          <NavLink
            to="/expenses"
            className="block py-2 px-4 text-white hover:bg-blue-600"
          >
            Expenses
          </NavLink>
          <NavLink
            to="/register"
            className="block py-2 px-4 text-white hover:bg-blue-600"
          >
            Register
          </NavLink>
          <NavLink
            to="/budget"
            className="block py-2 px-4 text-white hover:bg-blue-600"
          >
            Budget
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
