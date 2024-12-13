import React, { createContext, useContext, useState, useEffect } from "react";

// Create context for storing foodServicePaymentID
const FoodServicePaymentContext = createContext();

export const FoodServicePaymentProvider = ({ children }) => {
  // Try to load the saved foodServicePaymentID from localStorage (or sessionStorage)
  const savedPaymentID = localStorage.getItem("foodServicePaymentID");

  const [foodServicePaymentID, setFoodServicePaymentID] = useState(savedPaymentID || null);

  // Whenever the foodServicePaymentID changes, persist it in localStorage
  useEffect(() => {
    if (foodServicePaymentID) {
      localStorage.setItem("foodServicePaymentID", foodServicePaymentID);
    } else {
      localStorage.removeItem("foodServicePaymentID");
    }
  }, [foodServicePaymentID]);

  return (
    <FoodServicePaymentContext.Provider value={{ foodServicePaymentID, setFoodServicePaymentID }}>
      {children}
    </FoodServicePaymentContext.Provider>
  );
};

export const useFoodServicePayment = () => {
  return useContext(FoodServicePaymentContext);
};
