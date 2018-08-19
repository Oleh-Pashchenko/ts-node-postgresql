export interface IUserModel {
  id?: number;
  username: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  isEmailVerified: boolean;
}
