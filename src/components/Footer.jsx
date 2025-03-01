const Footer = () => {
  return (
<footer className="bg-white text-gray-800 py-6 mt-auto w-full text-sm shadow-md border-t">
  <div className="max-w-7xl mx-auto text-center px-4">
    <p>© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
  </div>
</footer>

  );
};

export default Footer;
