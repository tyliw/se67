package food_service

import (
	"gorm.io/gorm"
)

type OrderDetailMenuOption struct {
	gorm.Model
	OrderDetailID    uint
	OrderDetail      *OrderDetail `gorm:"foreignKey:OrderDetailID;constraint:OnDelete:CASCADE;"`

	MenuItemOptionID uint
	MenuItemOption   *MenuItemOption `gorm:"foreignKey:MenuItemOptionID;constraint:OnDelete:CASCADE;"`
}