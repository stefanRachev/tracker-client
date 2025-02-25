import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-blue-500 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
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
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:block lg:flex lg:space-x-6`}
        >
          <a href="/" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="/expenses" className="text-white hover:text-gray-300">
            Expenses
          </a>
          <a href="/budget" className="text-white hover:text-gray-300">
            Budget
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
