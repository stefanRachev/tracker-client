import { Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LandingPage from "../pages/LandingPage";
//import Dashboard from "../pages/Dashboard";

function Content() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
}

export default Content;
