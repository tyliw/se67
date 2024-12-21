package entity

import (
	"gorm.io/gorm"
)

type OrderDetailMenuOptions struct {
	gorm.Model
	OrderDetailID    uint
	OrderDetail      *OrderDetails `gorm:"foreignKey:OrderDetailID;constraint:OnDelete:CASCADE;"`

	MenuItemOptionID uint
	MenuItemOption   *MenuItemOptions `gorm:"foreignKey:MenuItemOptionID;constraint:OnDelete:CASCADE;"`
}