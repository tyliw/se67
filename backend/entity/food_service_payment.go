package entity

import (
	"time"
	"gorm.io/gorm"
)

type FoodServicePayment struct {
	gorm.Model
	PaymentDate 	time.Time 		`valid:"required~PaymentDate is required"`
	Price 			float64			`valid:"-"`
	VAT             float64        	`valid:"-"`
	PaymentStatus	string			`valid:"required~PaymentStatus is required"`
	PaymentMethod	string			`valid:"required~PaymentMethod is required"`
	
	// OrderID ทำหน้าที่เป็น FK
	OrderID 		uint			`valid:"required~OrderID is required"`
	Order   		*Orders 		`gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE;"`

	// TripPaymentID ทำหน้าที่เป็น FK
	TripPaymentID 	uint			`valid:"required~TripPaymentID is required"`
	TripPayment   	*TripPayment 	`gorm:"foreignKey:TripPaymentID;constraint:OnDelete:CASCADE;"`
}