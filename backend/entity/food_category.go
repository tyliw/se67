package entity

import (
	"gorm.io/gorm"
 )
 
 type FoodCategories struct {
	gorm.Model
	Name  				string
	FoodCategoryImage 	string 	`gorm:"type:longtext"`
 }