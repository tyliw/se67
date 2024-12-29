package entity

import (
	"time"

	"gorm.io/gorm"
)

type Orders struct {
	gorm.Model
	OrderDate   time.Time `valid:"required~OrderDate is required"`
	TotalAmount float64   `valid:"required~TotalAmount is required"`
	Status      string    `valid:"required~Status is required"`

	CustomerID uint       `valid:"required~CustomerID is required"`
	Customer   *Customers `gorm:"foreignKey:CustomerID;constraint:OnDelete:CASCADE;" valid:"-"`

	OrderDetails []OrderDetails `gorm:"foreignKey:OrderID" valid:"-"`
}
