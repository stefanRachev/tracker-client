import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
     
        <NavLink to="/" className="text-white text-2xl font-bold">
          Expense Tracker
        </NavLink>

        <nav className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link bg-blue-700" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link bg-blue-700" : "nav-link"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link bg-blue-700" : "nav-link"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "nav-link bg-blue-700" : "nav-link"
            }
          >
            Register
          </NavLink>
        </nav>

        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-blue-500 text-white text-center space-y-4 p-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link bg-blue-700" : "nav-link"
            }
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link bg-blue-700" : "nav-link"
            }
            onClick={toggleMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link bg-blue-700" : "nav-link"
            }
            onClick={toggleMenu}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "nav-link bg-blue-700" : "nav-link"
            }
            onClick={toggleMenu}
          >
            Register
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
