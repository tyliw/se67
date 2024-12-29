package entity

import (
	"time"
	// "team03/se67/entity/booking_trip"

	"gorm.io/gorm"
)

type BookingCabin struct {
	gorm.Model
	CheckIn       time.Time
	CheckOut      time.Time
	BookingStatus string
	Note          string
	TotalPrice    float64

	BookingTripID uint
	BookingTrip   *BookingTrip `gorm:"foreignKey:BookingTripID"`

	CabinID uint
	Cabin   *Cabin `gorm:"foreignKey:CabinID"`
}
