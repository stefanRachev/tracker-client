import { Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";

function Content() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default Content;
