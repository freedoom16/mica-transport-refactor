import React, { useState, useEffect } from "react";

interface Suggestion {
  formatted: string;
}

const LocationInput: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const API_KEY = "f20bdd1c4a7b4139b83d4901b95d6dc4"; // Replace with your OpenCage API key
  const API_URL = "https://api.opencagedata.com/geocode/v1/json";

  // Fetch suggestions when the query changes
  useEffect(() => {
    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchSuggestions = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(
          searchQuery
        )}&pretty=1&no_annotations=1&limit=5`
      );
      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (formatted: string) => {
    setQuery(formatted);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a location"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading && (
        <div className="absolute right-3 top-3 animate-spin text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v3m0 9v3m7.5-7.5h-3m-9 0H4.5m12.364-6.364l-2.121 2.12m-6.486 6.486l-2.121 2.121m0-10.606l2.121 2.121m6.486 6.486l2.121 2.121"
            />
          </svg>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg text-black">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion.formatted)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 bg-gray-300"
            >
              {suggestion.formatted}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
