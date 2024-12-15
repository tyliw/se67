package customer


import "gorm.io/gorm"


type Genders struct {

   gorm.Model

   Gender string

}