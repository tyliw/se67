import { ShipInterface } from "./IShip";
import { RoutsInterface } from "./IRoutes";


export interface CruiseTripInterface {
    ID?: number,
    CruiseTripName?: string,
	Deets?:          string,
	StartDate?:      Date,
	EndDate?:        Date,
	PlanImg?:        string,
	PlanPrice?:      number,
	ParticNum?:      number,

	ShipID?:      number,
	Ship?:        ShipInterface,

	EmployeesID?: number,

	RoutesID?:    number,
	Routes?:      RoutsInterface,

}