import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isAuthenticated) {
      logout();
    }
  }, [isAuthenticated, user, logout]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <NavLink to="/" className="text-white text-2xl font-bold">
          Expense Tracker
        </NavLink>

        <nav className="hidden md:flex space-x-6 items-center">
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

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-white flex items-center gap-2">
                Welcome,{" "}
                <span className="font-extrabold text-white flex items-center gap-2">
                  <FaUser /> {user?.username}
                </span>
              </span>

              <button onClick={handleLogout} className="logout-btn rounded-lg">
                Logout
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
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

          {isAuthenticated ? (
            <>
              <span className="block text-center text-lg font-semibold py-2 mb-4 border-b border-purple-300">
                <span className="text-purple-200">Welcome,</span>{" "}
                <span className="font-extrabold text-white flex items-center justify-center gap-2">
                  <FaUser /> {user?.username}
                </span>
              </span>
              <button onClick={handleLogout} className="logout-btn w-full rounded-lg">
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;