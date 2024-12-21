package entity

import (
	"gorm.io/gorm"
)

// OrderDetail
type OrderDetails struct {
	gorm.Model
	Quantity   int
	Amount     float64
	
	MenuID     uint          // อ้างอิง Menu โดยตรง
	Menu       *Menus         `gorm:"foreignKey:MenuID"`
	
	OrderID    uint
	Order      *Orders `gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE;"`
}