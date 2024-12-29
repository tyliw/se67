export interface TripPaymentInterface {
    ID?: number;
    PaymentDate?: Date;
    TotalPrice?: number;
    VAT?: number;
    Status?: string;
    PaymentMethod?: string;

    // BookingCabinID: number;
    // BookingCabin?: TripPaymentInterface;
}