import { UserPairedDog } from './userPairedDog';
/**
 * Created by M1k1tus on 27-Mar-17.
 */

export class Visit {
  constructor(
    public placeName: string,
    public visitTime: Date,
    public placeId: string,
    public assignedPairs: UserPairedDog[],
    public details?: string,
    public _id?: string
  ) {}


}
