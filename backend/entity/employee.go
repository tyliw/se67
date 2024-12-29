package entity


import (
	
   "time"
   "gorm.io/gorm"
)

type Employees struct {

   gorm.Model

   FirstName string    `json:"first_name"`
   LastName  string    `json:"last_name"`
   Email     string    `json:"email"`
	Phone     string    `json:"phone"`
   Age       uint8     `json:"age"`
   Address   string    `json:"Address"`
   BirthDay  time.Time `json:"birthday"`
   Password  string    `json:"-"`
   Salary    float32   `json:"salary"`
   Picture     string `json:"picture" gorm:"type:longtext"`
   
   GenderID  uint      `json:"gender_id"`
   Gender    *Genders  `gorm:"foreignKey: GenderID" json:"gender"`

   RoleID  uint      `json:"roles_id"`
   Role    *Roles  `gorm:"foreignKey: RoleID" json:"role"`

   StatusID uint	 `json:"status_id"`
   Status  *Status `gorm:"foreignKey: StatusID" json:"status"`

   CruiseShipID uint	 `json:"cruiseship_id"`
//   CruiseShip  *CruiseShip `gorm:"foreignKey: CruiseShipID" json:"cruiseship"`
}