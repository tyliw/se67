package entity

import (
	"gorm.io/gorm"
)
 
 type MenuOptions struct {
	gorm.Model
	OptionName 		string	`valid:"required~OptionName is required"`
	OptionValue 	string	`valid:"required~OptionValue is required"`
	ExtraPrice		float64 `valid:"-"` // สามารถเป็น 0 ได้ ไม่ต้อง required
}