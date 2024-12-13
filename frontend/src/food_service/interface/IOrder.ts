import { UsersInterface } from "../../interfaces/IUser";

export interface OrderInterface {
  ID?: number;
  OrderDate: Date;
  TotalAmount: number;
  Status: string;
  
  CustomerID: number;
  Customer?: UsersInterface;
}
