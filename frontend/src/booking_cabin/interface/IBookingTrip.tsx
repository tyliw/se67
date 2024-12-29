import { CustomerInterface } from "../../interfaces/ICustomer"

export interface BookingTripInterface {
    BookingDate:    Date,
    BookingStatus:  string,
    NumberOfGuests: number,
    // BookingCabins []Cabin `gorm:"foreignKey:BookingTripID"`

    CustomerID: number,
    Customer:   CustomerInterface 

    CruiseTripID: number
}
