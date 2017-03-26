export class Dog {
constructor(
    public _id: string,
    public nameFull: string,
    public nameNickname: string,
    public dateBirth: string,
    public breed: string,
    public registerNumber: string,
    public status: string,
    public dateQualification?: string,
    public dateGraduation?: string,
    public dateMedal?: string,
    public dateRetired?: string,
    public details?: string
) {}


}