package server2

import (
    "bytes"
    "encoding/json"
    "io"
    "log"
    "net/http"
    "github.com/stripe/stripe-go/v81"
    "github.com/stripe/stripe-go/v81/checkout/session"
)

func Server() {
  // This is your test secret API key.
  stripe.Key = "sk_test_51QRFSY4eZiOnIPcQJpzxRhlIWbGPY2P25WNx1uEFK7ucifveuVOFj0OCvCwZs7M1GHFHDQVPHSh0HH5IE8ssZIQU00rj7j7uN8"

  http.Handle("/", http.FileServer(http.Dir("public")))
  http.HandleFunc("/create-checkout-session", corsMiddleware(createCheckoutSession))
  http.HandleFunc("/session-status", corsMiddleware(retrieveCheckoutSession))
  addr := "localhost:4242"
  log.Printf("Listening on %s", addr)
  log.Fatal(http.ListenAndServe(addr, nil))
}

// corsMiddleware adds CORS headers to the response
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight (OPTIONS) request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	}
}


func createCheckoutSession(w http.ResponseWriter, r *http.Request) {
  domain := "http://localhost:4242"
  params := &stripe.CheckoutSessionParams{
    UIMode: stripe.String("embedded"),
    ReturnURL: stripe.String(domain + "/return?session_id={CHECKOUT_SESSION_ID}"),
    LineItems: []*stripe.CheckoutSessionLineItemParams{
      &stripe.CheckoutSessionLineItemParams{
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        Price: stripe.String("price_1QRFuU4eZiOnIPcQmuPUMD0T"),
        Quantity: stripe.Int64(1),
      },
    },
    Mode: stripe.String(string(stripe.CheckoutSessionModePayment)),
  }

  s, err := session.New(params)

  if err != nil {
    log.Printf("session.New: %v", err)
  }

  writeJSON(w, struct {
    ClientSecret string `json:"clientSecret"`
  }{
    ClientSecret: s.ClientSecret,
  })
}

func retrieveCheckoutSession(w http.ResponseWriter, r *http.Request) {
  s, _ := session.Get(r.URL.Query().Get("session_id"), nil)

  writeJSON(w, struct {
    Status string `json:"status"`
    CustomerEmail string `json:"customer_email"`
  }{
    Status: string(s.Status),
    CustomerEmail: string(s.CustomerDetails.Email),
  })
}

func writeJSON(w http.ResponseWriter, v interface{}) {
  var buf bytes.Buffer
  if err := json.NewEncoder(&buf).Encode(v); err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    log.Printf("json.NewEncoder.Encode: %v", err)
    return
  }
  w.Header().Set("Content-Type", "application/json")
  if _, err := io.Copy(w, &buf); err != nil {
    log.Printf("io.Copy: %v", err)
    return
  }
}