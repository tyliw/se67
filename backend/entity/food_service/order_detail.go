package food_service

import (
	"gorm.io/gorm"
)

// OrderDetail
type OrderDetail struct {
	gorm.Model
	Quantity   int
	Amount     float32
	
	MenuID     uint          // อ้างอิง Menu โดยตรง
	Menu       *Menu         `gorm:"foreignKey:MenuID"`
	
	OrderID    uint
	Order      *Order `gorm:"foreignKey:OrderID;constraint:OnDelete:CASCADE;"`
}