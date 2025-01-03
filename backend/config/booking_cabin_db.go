package config

import (
	"fmt"
	"team03/se67/entity"
	"time"
)

func SetupBookingCabinDatabase() {
	db.AutoMigrate(
		&entity.BookingCabin{},
	)
	
	// Create BookingCabin
	// CheckIn, _ := time.Parse("2006-01-02","2024-11-11")
	// CheckOut, _ := time.Parse("2006-01-02","2024-11-18")
	CheckIn:= time.Now()
	CheckOut:= time.Now().Add(24 * time.Hour)
	BookingCabin := []entity.BookingCabin{
		{
			CheckIn: CheckIn,
			CheckOut: CheckOut,
			BookingStatus: "Pending",
			Note: "-",
			TotalPrice: 150000,
			BookingTripID: 1,
			CabinID: 1,
		},
	}

	for _, bookingcabin := range BookingCabin {
		db.FirstOrCreate(&bookingcabin, &entity.BookingCabin{BookingTripID: bookingcabin.BookingTripID})
	}

	fmt.Println("Booking cabin saved:", BookingCabin)
}