package config

import (
	"fmt"
	"team03/se67/entity"
	"time"
)

func SetupBookingTripDatabase() {
	db.AutoMigrate(
		&entity.BookingTrip{},
	)
	
	// Create BookingTrip
	BookingDate := time.Now()
	BookingTrip := []entity.BookingTrip{
		{
			BookingDate: BookingDate,
			BookingStatus: "Pending",
			CustomerID: 1,
			CruiseTripID: 1,
		},
	}

	for _, bookingtrip := range BookingTrip {
		db.FirstOrCreate(&bookingtrip, &entity.BookingTrip{CustomerID: bookingtrip.CustomerID, CruiseTripID: bookingtrip.CruiseTripID})
	}

	fmt.Println("Booking trip saved:", BookingTrip)
}