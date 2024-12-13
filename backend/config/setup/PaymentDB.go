package setup

import (
	"fmt"
	"project-se67/entity/payment"
	"time"
	"gorm.io/gorm"
)

func SetupPaymentDatabase(db *gorm.DB) {
	// Auto-migrate tables
	db.AutoMigrate(
		&payment.TripPayment{},
		&payment.FoodServicePayment{},
	)

	// Create sample TripPayment
	tripPayment := payment.TripPayment{
		PaymentDate:   time.Now(),
		TotalPrice:    100.0,
		PaymentStatus: "succeeded",
		PaymentMethod: "promptpay",
		BookingCabinID: 1,
	}
	db.FirstOrCreate(&tripPayment)

	// Create sample FoodServicePayment linked to Order and TripPayment
	foodServicePayment := payment.FoodServicePayment{
		PaymentDate:   time.Now(),
		Price:         370,
		PaymentStatus: "succeeded",
		PaymentMethod: "card",
		OrderID:       1,
		TripPaymentID: tripPayment.ID,
	}
	db.FirstOrCreate(&foodServicePayment)

	fmt.Println("Payment data has been added to the database.")
}
