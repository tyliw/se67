package booking_trip

import (
	"project-se67/entity/customer"
	"time"

	"gorm.io/gorm"
)

type BookingTrip struct {
	gorm.Model
	BookingDate   time.Time
	BookingStatus string
	NumberOfGuests int

	CustomerID uint
	Customer   customer.Customer `gorm:"foreignKey:CustomerID"`

	CruiseTripID uint
	// CruiseTrip   CruiseTrip `gorm:"foreignKey:CruiseTripID"`
}
