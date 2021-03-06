import {placeOverseer} from "./placeOverseer";
/**
 * Created by M1k1tus on 26-Mar-17.
 */

export class Place {
  constructor(
    public name: string,
    public addressStreet: string,
    public addressCode: string,
    public addressCity: string,
    public visitationInterval: string,
    public pairAmount?: number,
    public overseerId?: string,
    public details?: string,
    public _id?: string,
    public overseer?: placeOverseer
  ) {}


}
