package entity

import (
	"gorm.io/gorm"
)

type MenuItemOptions struct {
	gorm.Model
	MenuID     		uint
	Menu      		*Menus      	`gorm:"foreignKey:MenuID"`

	MenuOptionID 	uint
	MenuOption   	*MenuOptions `gorm:"foreignKey:MenuOptionID"`
}
