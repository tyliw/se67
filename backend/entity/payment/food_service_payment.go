package payment

import (
	"project-se67/entity/food_service"
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
	Order   		*food_service.Order `gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE;"`

	// TripPaymentID ทำหน้าที่เป็น FK
	TripPaymentID 	uint
	TripPayment   	*TripPayment `gorm:"foreignKey:TripPaymentID;constraint:OnDelete:CASCADE;"`

}