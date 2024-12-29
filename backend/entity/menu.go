package entity

import (
	"gorm.io/gorm"
 )
 
 type Menus struct {
	gorm.Model
	MenuName 	string	`valid:"required~MenuName is required"`
	Price 		float64 `valid:"required~Price is required"`
	Description string	`valid:"required~Description is required"`
	ImageMenu   string 	`gorm:"type:longtext" valid:"required~ImageMenu is required"`

	// FoodCategoryID ทำหน้าที่เป็น FK
	FoodCategoryID 		uint `valid:"required~FoodCategoryID is required"`
	FoodCategory    	*FoodCategories  `gorm:"foreignKey: FoodCategoryID" valid:"-"`

	// MenuOptions []*MenuOptions `gorm:"many2many:menu_item_options;" valid:"-"`
 }