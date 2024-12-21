package entity

import (
	"time"

	"gorm.io/gorm"
)

type Orders struct {
	gorm.Model
	OrderDate 		time.Time
	TotalAmount     float64
	Status			string

	CustomerID    uint
	Customer      *Customers `gorm:"foreignKey:CustomerID;constraint:OnDelete:CASCADE;"`

	OrderDetails []OrderDetails      `gorm:"foreignKey:OrderID"`
}