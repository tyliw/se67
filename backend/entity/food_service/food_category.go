package food_service

import (
	"gorm.io/gorm"
 )
 
 type FoodCategory struct {
	gorm.Model
	Name  				string
	FoodCategoryImage 	string 	`gorm:"type:longtext"`
 }