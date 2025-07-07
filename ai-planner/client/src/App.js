import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TripPreferences from "./pages/TripPreferences";
import HotelSearch from "./pages/HotelSearch";

const Home = () => (
  <div>
    <h1>Welcome to Dayzee Travel Planner</h1>
    <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link> | <Link to="/preferences">Trip Preferences</Link> | <Link to="/hotels">Find Hotels</Link>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/preferences" element={<TripPreferences />} />
        <Route path="/hotels" element={<HotelSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
