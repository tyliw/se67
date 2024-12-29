package entity

import (
	"gorm.io/gorm"
)

// OrderDetail
type OrderDetails struct {
	gorm.Model
	Quantity   int		`valid:"required~Quantity is required"`
	Amount     float64	`valid:"required~Amount is required"`
	
	MenuID     uint     `valid:"required~MenuID is required"`
	Menu       *Menus   `gorm:"foreignKey:MenuID" valid:"-"`
	
	OrderID    uint		`valid:"required~OrderID is required"`
	Order      *Orders 	`gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE;" valid:"-"`
}