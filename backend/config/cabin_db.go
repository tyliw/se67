package config

import (
	"fmt"
	"team03/se67/entity"
	// "time"
	// "gorm.io/gorm"
)

func SetupCabinDatabase() {
	// Auto-migrate tables
	db.AutoMigrate(
		&entity.Cabin{},
	)

	// Create sample TripPayment
	cabin := entity.Cabin{
		CabinNumber: 101,
		Capacity:    4,
		Availability: "available",
		CabinTypeID: 1,
	}
	db.FirstOrCreate(&cabin)

	fmt.Println("Cabin data has been added to the database.")
}
