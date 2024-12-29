package entity

import (
	"time"
	"gorm.io/gorm"
)


type Promotion struct {

   gorm.Model

   Name string `json:"name"`
   Details string `gorm:"type:TEXT" json:"details"`
   Code string `json:"code"`
   Start_date time.Time `json:"start_date"`
   End_date time.Time `json:"end_date"`
   Discount float32 `json:"discount"`
   Minimum_price float32 `json:"minimum_price"`
   Limit uint `json:"limit"`
   Count_Limit uint `json:"count_limit"`
   Limit_discount float32 `json:"limit_discount"`

   DiscountID uint `json:"discount_id"`
   Discount_type *Discount_type `gorm:"foreignKey: discount_id" json:"discount_type"`
   
   TypeID uint `json:"type_id"`
   Type   *Promotion_type `gorm:"foreignKey: type_id" json:"type"`

   StatusID uint `json:"status_id"`
   Status   *Promotion_status `gorm:"foreignKey: status_id" json:"status"`
}