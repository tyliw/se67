import { StatusInterface } from "../../booking_cabin/interface/IStatus";
import { CustomerInterface } from "../../interfaces/ICustomer";

export interface OrderInterface {
  ID?: number;
  OrderDate?: Date;
  TotalAmount?: number;
  
  StatusID?: number;
  Status?: StatusInterface;
  
  CustomerID?: number;
  Customer?: CustomerInterface;
}
