export interface AuthRegisterDto {
  firstName: string;
  lastName: string;
  secondName?: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth: Date;
  address: string;
}
