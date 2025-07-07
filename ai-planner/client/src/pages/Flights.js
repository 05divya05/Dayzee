import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Flights = () => {
  const [destination, setDestination] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dest = localStorage.getItem("selectedDestination");
    if (dest) {
      setDestination(JSON.parse(dest));
    } else {
      // If no destination is selected, redirect back to preferences
      navigate("/preferences");
    }
  }, [navigate]);

  if (!destination) return null;

  return (
    <div className="auth-container">
      <h2>Flights to {destination.location}</h2>
      <p><strong>IATA Code:</strong> {destination.iataCode}</p>
      <p><strong>Estimated Price:</strong> ${destination.price}</p>
      {/* TODO: Integrate flight recommendations API here */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Flight Recommendations</h3>
        <p>Flight search and selection coming soon...</p>
      </div>
    </div>
  );
};

export default Flights; 