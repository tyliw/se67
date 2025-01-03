import { CabinTypeInterface } from "./ICabinType";

export interface CabinInterface {
	ID?: number,
	CabinNumber?:  number,
	Capacity?:     number,
	Availability?: string,

	CabinTypeID: number,
	CabinType?:   CabinTypeInterface,
}
