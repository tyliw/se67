import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";
import "./StripeCheckout.css";
// import { useFoodServicePayment } from "../payment/context/FoodServicePaymentContext";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51QOxoF4QmAAjQ0QzsimUKy0RcgMxNPvfbmCm6OJurQzEGULD1u2OfTSGfdd0OwpEW0tzpdkQvmQSZKvbq9waUceD00PaT9sjdJ");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const location = useLocation();
  const { total } = location.state || {};
  console.log("StripeCheckout total",total)
  // const { setFoodServicePaymentID, foodServicePaymentID } = useFoodServicePayment();

  useEffect(() => {

      fetch("http://localhost:4242/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "total", amount: Math.round(total * 100) }] }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
            setDpmCheckerLink(data.dpmCheckerLink);
          } else {
            console.error("Invalid response: clientSecret missing.");
          }
        })
        .catch((error) => {
          console.error("Error creating PaymentIntent:", error);
        });
  }, []);

  return (
    <div className="StripeCheckout">
      {clientSecret ? (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm dpmCheckerLink={dpmCheckerLink} total={total}/>
        </Elements>
      ) : (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}
