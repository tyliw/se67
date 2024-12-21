package entity

import (
	"time"
	"gorm.io/gorm"
)

type FoodServicePayment struct {
	gorm.Model
	PaymentDate 	time.Time 		`gorm:"not null"`
	Price 			float32			`gorm:"not null"`
	PaymentStatus	string			`gorm:"not null"`
	PaymentMethod	string			`gorm:"not null"`
	
	// OrderID ทำหน้าที่เป็น FK
	OrderID 		uint
	Order   		*Orders `gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE;"`

	// TripPaymentID ทำหน้าที่เป็น FK
	TripPaymentID 	uint
	TripPayment   	*TripPayment `gorm:"foreignKey:TripPaymentID;constraint:OnDelete:CASCADE;"`

}