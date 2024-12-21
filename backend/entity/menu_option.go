package entity

import (
	"gorm.io/gorm"
 )
 
 type MenuOptions struct {
	gorm.Model
	OptionName 		string
	OptionValue 	string
	ExtraPrice 		float32

	Menus []*Menus `gorm:"many2many:menu_item_options;"`
 }