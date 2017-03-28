export class Dog {
constructor(
    public dogId: string,
    public nameFull: string,
    public nameNickname: string,
    public dateBirth: Date,
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
