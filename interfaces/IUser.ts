import { IAddress } from './IAddress';
import { ICryptoAddress } from './ICryptoAddress';

export interface IUser {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  state: boolean;
  phone: number;
  dateCreated: Date;
  password?: string;
  cryptoAddress?: ICryptoAddress;
  address?: IAddress;
}
