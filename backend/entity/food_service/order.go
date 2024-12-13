package food_service

import (
	"project-se67/entity/customer"
	"time"

	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	OrderDate 		time.Time
	TotalAmount     float32
	Status			string

	CustomerID    uint
	Customer      *customer.Customer `gorm:"foreignKey:CustomerID;constraint:OnDelete:CASCADE;"`
}