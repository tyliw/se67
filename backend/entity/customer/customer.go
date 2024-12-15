package customer


import (
   "time"
   "gorm.io/gorm"
)

type Customer struct {

   gorm.Model

   FirstName string

   LastName  string

   Email     string

   Age       uint8

   Password  string    `json:"-"`

   BirthDay  time.Time

   GenderID  uint

   Gender    *Genders  `gorm:"foreignKey: gender_id"`

   PhoneNumber string
}