import { CustomerInterface } from "../../interfaces/ICustomer"
import { CruiseTripInterface } from "./ICruiseTrip"

export interface BookingTripInterface {
    ID?: number,
    BookingDate?:    Date,
    BookingStatus?:  string,
    NumberOfGuests?: number,
    // BookingCabins []Cabin `gorm:"foreignKey:BookingTripID"`

    CustomerID?: number,
    Customer?:   CustomerInterface,

    CruiseTripID?: number,
    CruiseTrip?: CruiseTripInterface,
}
