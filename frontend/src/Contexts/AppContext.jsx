import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AppContext = createContext();

// Define the provider component
const AppContextProvider = ({ children }) => {
  const currencySymbol = "Rs.";
  const backendUrl = "http://localhost:9090"; // Ensure this matches your backend configuration

  const [user_id, setUserId] = useState(null);
  const [doctors, setDoctors] = useState([]); // State to store fetched doctors
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  // Fetch user_id from localStorage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    console.log("Stored user_id in localStorage:", storedUserId);
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fetch doctors from the backend on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${backendUrl}/backend/doctors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setDoctors(data); // Update doctors state with fetched data
        console.log("Doctors fetched:", data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError(err.message);
      } finally {
        setIsLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchDoctors();
  }, [backendUrl]);

  // Define the context value
  const value = {
    doctors,
    currencySymbol,
    user_id,
    setUserId,
    backendUrl,
    isLoading,
    error,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
