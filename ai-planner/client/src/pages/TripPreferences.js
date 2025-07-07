import React, { useState } from "react";
import axios from "axios";

const tripTypes = ["adventure", "cultural", "food", "relaxation", "nature", "shopping"];
const experienceOptions = ["hiking", "museums", "street food", "beaches", "nightlife", "historical sites"];

const TripPreferences = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [tripType, setTripType] = useState("");
  const [budget, setBudget] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [message, setMessage] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recError, setRecError] = useState("");

  const handlePrefChange = (option) => {
    setPreferences((prev) =>
      prev.includes(option) ? prev.filter((p) => p !== option) : [...prev, option]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecError("");
    setMessage("");
    setRecommendations([]);
    try {
      await axios.post("/api/preferences", {
        travelDates: { start, end },
        tripType,
        budget,
        preferences,
      });
      setMessage("Preferences saved!");
      // Fetch recommendations
      const recRes = await axios.post("/api/recommendations", {
        travelDates: { start, end },
        budget,
        preferences,
      });
      setRecommendations(recRes.data.recommendations || []);
    } catch (err) {
      setMessage("Error saving preferences");
      setRecError(err.response?.data?.message || "Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Trip Preferences</h2>
      <form onSubmit={handleSubmit}>
        <label>Start Date:</label>
        <input type="date" value={start} onChange={e => setStart(e.target.value)} required />
        <label>End Date:</label>
        <input type="date" value={end} onChange={e => setEnd(e.target.value)} required />
        <label>Trip Type:</label>
        <select value={tripType} onChange={e => setTripType(e.target.value)} required>
          <option value="">Select type</option>
          {tripTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        <label>Budget ($):</label>
        <input type="number" value={budget} onChange={e => setBudget(e.target.value)} min="0" required />
        <label>Experience Preferences:</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {experienceOptions.map(option => (
            <label key={option} style={{ minWidth: "120px" }}>
              <input
                type="checkbox"
                checked={preferences.includes(option)}
                onChange={() => handlePrefChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Preferences"}</button>
        {message && <p>{message}</p>}
        {loading && <p>Loading recommendations...</p>}
        {recError && <p style={{ color: '#d32f2f' }}>{recError}</p>}
        {recommendations.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h3>Recommended Destinations</h3>
            <ul>
              {recommendations.map((rec, idx) => (
                <li key={idx}>
                  <strong>{rec.location}</strong> (IATA: {rec.iataCode}) - ${rec.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default TripPreferences; 