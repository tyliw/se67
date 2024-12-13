package booking_cabin

import (
	"project-se67/entity/booking_trip"
	"time"

	"gorm.io/gorm"
)

type BookingCabin struct {
	gorm.Model
	CheckIn   time.Time
	CheckOut time.Time
	BookingStatus string
	Note string
	TotalPrice float64

	BookingTripID uint
	BookingTrip   booking_trip.BookingTrip `gorm:"foreignKey:BookingTripID"`

	CabinID uint
	Cabin   Cabin `gorm:"foreignKey:CabinID"`
}
