package food_service

import (
	"gorm.io/gorm"
)

type MenuItemOption struct {
	gorm.Model
	MenuID     		uint
	Menu      		*Menu      	`gorm:"foreignKey:MenuID"`

	MenuOptionID 	uint
	MenuOption   	*MenuOption `gorm:"foreignKey:MenuOptionID"`
}
