package entity

import (
	// "team03/se67/entity/hr_system"
	"gorm.io/gorm"
)
type Routes struct {

   gorm.Model
   RouteName string `json:"route_name"`

   WeatherID  uint      `json:"weather_id"`
   Weather   *Weathers  `gorm:"foreignKey: WeatherID" json:"weather"`

   CruisetripID  uint      `json:"cruisetrip_id"`
//   Cruisetrip    *Cruisetrips  `gorm:"foreignKey: CruisetripID" json:"cruisetrip"`

   CruiseShipID  uint      `json:"cruiseship_id"`
//   CruiseShip    *CruiseShips  `gorm:"foreignKey: CruiseShipID" json:"cruiseship"`

   EmployeeID  uint      `json:"employee_id"`
   Employee    *Employees  `gorm:"foreignKey: EmployeeID" json:"employee"`

}
//