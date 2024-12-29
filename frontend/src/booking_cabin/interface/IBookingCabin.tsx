
import { BookingTripInterface } from "./IBookingTrip";

export interface BookingCabinInterface {
	CheckIn:      Date,
	CheckOut:     Date,
	BookingStatus: string,
	Note:          string,
	TotalPrice:    number,

	BookingTripID: number,
	BookingTrip?:   BookingTripInterface,

	CabinID: number,
	// Cabin?:   Cabin,
}
