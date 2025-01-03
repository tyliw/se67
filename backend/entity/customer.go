package entity

import (
	"time"

	"gorm.io/gorm"
)
type Customers struct {
	gorm.Model

	FirstName   string  `json:"first_name"`
	LastName    string  `json:"last_name"`
	Email       string    `json:"email"`
	Phone       string    `json:"phone"`
	Age         uint8     `json:"age"`
	Address     string    `json:"Address"`
	BirthDay    time.Time `json:"birthday"`
	Password    string    `json:"-"`
	Picture     string  `json:"picture" gorm:"type:longtext"`
    GenderID  uint      `json:"gender_id"`
    Gender    *Genders  `gorm:"foreignKey: gender_id" json:"gender"`
	RoleID    uint      `json:"role_id"`
	Role    *Roles  `gorm:"foreignKey: role_id" json:"role"`
}
