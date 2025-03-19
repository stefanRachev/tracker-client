import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const CheckCookie = () => {
  const [message, setMessage] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white");

  useEffect(() => {
    fetch(`${API_URL}/api/check-cookie`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setMessage(`Cookie found: ${data.cookieValue}`);
          setBackgroundColor("lightgreen");
        } else {
          setMessage("No cookie found.");
          setBackgroundColor("lightcoral");
        }
      })
      .catch((error) => {
        console.error("Error checking cookie:", error);
        setMessage("Error checking cookie.");
        setBackgroundColor("lightgray");
      });
  }, []);

  return (
    <div style={{ backgroundColor, padding: "20px", textAlign: "center" }}>
      <h1>Cookie Check</h1>
      <p>{message}</p>
    </div>
  );
};

export default CheckCookie;
