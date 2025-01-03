package entity

import (
	"time"
	// "team03/se67/entity/booking_cabin"
	// "team03/se67/entity/cruise_trip"
	// "team03/se67/entity/hr_system"

	"gorm.io/gorm"
)

type BookingTrip struct {
	gorm.Model
	BookingDate    time.Time
	BookingStatus  string
	NumberOfGuests int

	// BookingCabins []Cabin `gorm:"foreignKey:BookingTripID"`

	CustomerID uint
	Customer   Customers `gorm:"foreignKey:CustomerID"`

	CruiseTripID uint
	CruiseTrip   CruiseTrip `gorm:"foreignKey:CruiseTripID"`
}
