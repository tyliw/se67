package entity

import "gorm.io/gorm"


type ReviewType struct {

   gorm.Model

   Review_Type string `json:"review_type"`

}