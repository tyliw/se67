import { BookingCabinInterface } from "../../booking_cabin/interface/IBookingCabin";

export interface TripPaymentInterface {
    ID?: number;
    PaymentDate?: Date;
    TotalPrice?: number;
    VAT?: number;
    Status?: string;
    PaymentStatus?: string;
    PaymentMethod?: string;

    BookingCabinID?: number;
    BookingCabin?: BookingCabinInterface;
}