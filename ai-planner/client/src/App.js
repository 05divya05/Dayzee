import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TripPreferences from "./pages/TripPreferences";
import HotelSearch from "./pages/HotelSearch";
import MyTrips from "./pages/MyTrips";
import LandingPage from "./pages/LandingPage";
import Flights from "./pages/Flights";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/preferences" element={<TripPreferences />} />
        <Route path="/hotels" element={<HotelSearch />} />
        <Route path="/trips" element={<MyTrips />} />
        <Route path="/flights" element={<Flights />} />
      </Routes>
    </Router>
  );
}

export default App;
