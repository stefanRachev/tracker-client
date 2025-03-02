import { LightningBoltIcon } from "@heroicons/react/solid";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <LightningBoltIcon className="w-24 h-24 mx-auto animate-bounce" />
        <h1 className="text-5xl font-extrabold mt-6 mb-4">404</h1>
        <p className="text-xl mb-6">Oops! The page was not found.</p>
        <p className="text-md">
          We apologize for the inconvenience, but the page you&apos;re looking
          for doesn&apos;t exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-white text-purple-600 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-purple-700 hover:text-white transition-all duration-300"
        >
          Back to Home Page
        </a>
      </div>
    </div>
  );
};

export default NotFound;
