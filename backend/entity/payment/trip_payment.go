package payment

import (
	"project-se67/entity/booking_cabin"
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
	BookingCabin	*booking_cabin.BookingCabin `gorm:"foreignKey:BookingCabinID;constraint:OnDelete:CASCADE;"`
}