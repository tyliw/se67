package entity

import (
	"gorm.io/gorm"
 )
 
 type Menus struct {
	gorm.Model
	MenuName 	string
	Price 		float64
	Description string
	ImageMenu   string 	`gorm:"type:longtext"`

	// FoodCategoryID ทำหน้าที่เป็น FK
	FoodCategoryID 		uint
	FoodCategory    	*FoodCategories  `gorm:"foreignKey: FoodCategoryID"`

	MenuOptions []*MenuOptions `gorm:"many2many:menu_item_options;"`
 }