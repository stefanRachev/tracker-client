import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-blue-500 p-3 md:p-4 lg:p-5 xl:p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center min-h-16">
        <div className="text-white text-2xl font-bold whitespace-nowrap">
          Expense Tracker
        </div>
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
          className={`absolute top-16 left-0 w-full bg-blue-500 lg:static lg:flex lg:items-center lg:space-x-6 z-20 transform transition-all duration-300
                ${menuOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:translate-x-0 lg:flex`}
        >
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/expenses"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Expenses
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Register
          </NavLink>
          <NavLink
            to="/budget"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Budget
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
