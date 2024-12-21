package setup

import (
	"fmt"
	"project-se67/entity"
	"time"
	"gorm.io/gorm"
)

func SetupPaymentDatabase(db *gorm.DB) {
	// Auto-migrate tables
	db.AutoMigrate(
		&entity.TripPayment{},
		&entity.FoodServicePayment{},
	)

	// Create sample TripPayment
	tripPayment := entity.TripPayment{
		PaymentDate:   time.Now(),
		TotalPrice:    100.0,
		PaymentStatus: "succeeded",
		PaymentMethod: "promptpay",
		BookingCabinID: 1,
	}
	db.FirstOrCreate(&tripPayment)

	// Create sample FoodServicePayment linked to Order and TripPayment
	foodServicePayment := entity.FoodServicePayment{
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
