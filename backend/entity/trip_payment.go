package entity

import (
	"time"

	"gorm.io/gorm"
)

type TripPayment struct {
	gorm.Model
	PaymentDate 	time.Time 		`gorm:"not null"`
	TotalPrice 		float32			`gorm:"not null"`
	PaymentStatus	string			`gorm:"not null"`
	PaymentMethod	string			`gorm:"not null"`

	
	BookingCabinID uint
	BookingCabin	*BookingCabin `gorm:"foreignKey:BookingCabinID;constraint:OnDelete:CASCADE;"`
}