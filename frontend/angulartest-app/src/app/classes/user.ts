import { UserPairedDog } from './userPairedDog';

export class User {
constructor(
	public accessLevel: number,
    public username: string,
    public firstName: string,
    public lastName: string,
    public phone: string,
    public email: string,
    public memberNumber: string,
    public password?: string,
    public qualificationDate?: Date,
    public details?: string,
	public _id?: string,
    public pairedDogs?: UserPairedDog[]
) {}
}
