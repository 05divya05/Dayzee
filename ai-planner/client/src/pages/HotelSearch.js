import React, { useState } from "react";
import axios from "axios";

const HotelSearch = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [budget, setBudget] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setHotels([]);
    try {
      const res = await axios.post("/api/hotels", {
        destination,
        checkIn,
        checkOut,
        budget,
      });
      setHotels(res.data.hotels || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch hotels");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Find Hotels</h2>
      <form onSubmit={handleSubmit}>
        <label>Destination:</label>
        <input type="text" value={destination} onChange={e => setDestination(e.target.value)} required />
        <label>Check-in:</label>
        <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required />
        <label>Check-out:</label>
        <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required />
        <label>Max Budget ($):</label>
        <input type="number" value={budget} onChange={e => setBudget(e.target.value)} min="0" required />
        <button type="submit" disabled={loading}>{loading ? "Searching..." : "Search Hotels"}</button>
      </form>
      {error && <p style={{ color: '#d32f2f' }}>{error}</p>}
      {hotels.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Hotel Results</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {hotels.map((hotel, idx) => (
              <li key={idx} style={{ marginBottom: "2rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
                <strong>{hotel.name}</strong><br />
                <span>{hotel.address}</span><br />
                {hotel.image && <img src={hotel.image} alt={hotel.name} style={{ width: 200, borderRadius: 8, margin: "1rem 0" }} />}
                {hotel.bookingUrl && <div><a href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer">Book Now</a></div>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HotelSearch; 