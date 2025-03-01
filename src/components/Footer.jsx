const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-6 shadow-md">
      <div className="max-w-7xl mx-auto text-center">
        <p>
          © {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
