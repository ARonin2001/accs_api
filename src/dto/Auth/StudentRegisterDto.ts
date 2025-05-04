export interface StudentRegisterDto {
  firstName: string;
  lastName: string;
  secondName?: string;
  phone: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  address: string;
  groupId: number;
}
