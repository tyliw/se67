package booking_cabin

import "gorm.io/gorm"

type Cabin struct {
	gorm.Model
	CabinNumber int
	Capacity    int
	Availability string

	BookingCabins []BookingCabin `gorm:"foreignKey:CabinID"`

	CabinTypeID uint
	CabinType   CabinType `gorm:"foreignKey:CabinTypeID"`
}
