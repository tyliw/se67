package entity

import (
	"time"

	"gorm.io/gorm"
)

type BookingTrip struct {
	gorm.Model
	BookingDate   time.Time
	BookingStatus string
	NumberOfGuests int

	CustomerID uint
	Customer   Customers `gorm:"foreignKey:CustomerID"`

	CruiseTripID uint
	// CruiseTrip   CruiseTrip `gorm:"foreignKey:CruiseTripID"`
}
