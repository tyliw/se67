
import { BookingTripInterface } from "./IBookingTrip";
import { CabinInterface } from "./ICabin";

export interface BookingCabinInterface {
	ID?: number,
	CheckIn?:      Date,
	CheckOut?:     Date,
	BookingStatus?: string,
	Note?:          string,
	TotalPrice?:    number,

	BookingTripID?: number,
	BookingTrip?:   BookingTripInterface,

	CabinID?: number,
	Cabin?:   CabinInterface,
}
