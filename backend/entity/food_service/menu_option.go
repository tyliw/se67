package food_service

import (
	"gorm.io/gorm"
 )
 
 type MenuOption struct {
	gorm.Model
	OptionName 		string
	OptionValue 	string
	ExtraPrice 		float32
 }