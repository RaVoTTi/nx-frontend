import { IAddress } from './IAddress';
import { ICryptoAddress } from './ICryptoAddress';

export interface IUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  state: boolean;
  password?: string;
  phone: number;
  dateCreated: Date;
  cryptoAddress?: ICryptoAddress;
  address?: IAddress;
}
