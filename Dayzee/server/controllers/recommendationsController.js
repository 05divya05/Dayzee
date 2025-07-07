import axios from "axios";

const AMADEUS_CLIENT_ID = process.env.AMADEUS_CLIENT_ID;
const AMADEUS_CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET;
const AMADEUS_API_URL = "https://test.api.amadeus.com/v1/shopping/flight-destinations";
const AMADEUS_AUTH_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const DEFAULT_ORIGIN = "JFK";

async function getAmadeusAccessToken() {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", AMADEUS_CLIENT_ID);
  params.append("client_secret", AMADEUS_CLIENT_SECRET);
  const { data } = await axios.post(AMADEUS_AUTH_URL, params);
  return data.access_token;
}

export const getRecommendations = async (req, res) => {
  try {
    const { travelDates, budget, preferences } = req.body;
    const accessToken = await getAmadeusAccessToken();
    const params = {
      origin: DEFAULT_ORIGIN,
      departureDate: travelDates?.start,
      returnDate: travelDates?.end,
      maxPrice: budget,
      oneWay: false,
      currency: "USD",
    };
    const { data } = await axios.get(AMADEUS_API_URL, {
      params,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    let results = data.data || [];
    // Optionally filter by preferences (e.g., adventure, beach, etc.)
    if (preferences && preferences.length > 0) {
      // This is a placeholder: in real use, you'd map IATA codes to tags/experiences
      results = results.filter(dest => {
        // Example: filter by destination name or IATA code matching preference
        return preferences.some(pref =>
          (dest.destination && dest.destination.toLowerCase().includes(pref.toLowerCase())) ||
          (dest.destinationName && dest.destinationName.toLowerCase().includes(pref.toLowerCase()))
        );
      });
      if (results.length === 0) results = data.data; // fallback if no match
    }
    // Sort by price ascending
    results = results.sort((a, b) => a.price.total - b.price.total);
    // Pick top 3-5
    const best = results.slice(0, 5).map(dest => ({
      location: dest.destinationName || dest.destination,
      price: dest.price.total,
      iataCode: dest.destination,
    }));
    res.json({ recommendations: best });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recommendations", error: err.message });
  }
}; 