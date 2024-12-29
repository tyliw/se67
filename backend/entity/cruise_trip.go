package entity

import (
	"time"
	// "team03/se67/entity/booking_trip"
	// "team03/se67/entity/hr_system"
	// "team03/se67/entity/review"
	// "team03/se67/entity/route_system"

	"gorm.io/gorm"
)

type CruiseTrip struct {
	gorm.Model
	CruiseTripName string `gorm:"uniqueIndex" valid:"required~กรอกชื่อทริป"`
	Deets          string `valid:"required~ใส่ข้อความ, deets_valid~ใส่ข้อความ"`
	StartDate      time.Time `valid:"required~เวลาห้ามเป็นอดีต,after_yesterday~เวลาห้ามเป็นอดีต"`
	EndDate        time.Time `valid:"required~เวลาห้ามเป็นอดีต,after_yesterday~เวลาห้ามเป็นอดีต"`
	PlanImg        string `valid:"required~ใส่รูปภาพ, image_valid~ใส่รูปภาพ"`
	PlanPrice      float64 `valid:"required~กรอกราคาช่วง 1000000 - 1000000, range(1000000|10000000)~กรอกราคาช่วง 1000000 - 1000000"`
	ParticNum      int `valid:"required~กรอกตัวเลข, description_valid~ใส่จำนวนคน"`

	ShipID      uint
	// Ship        Ship `gorm:"foreignKey:ShipID"`

	EmployeesID uint
	// Employees   Employees `gorm:"foreignKey:EmployeesID"`

	RoutesID    uint
	// Routes      Routes `gorm:"foreignKey:RoutesID"`

	// BookingTrip []BookingTrip `gorm:"foreignKey:CruiseTripID"`

	// Review []Review `gorm:"foreignKey:CruiseTripID"`
}
