import { IBook } from './IBook';
import { IEvaluation } from './IEvaluation';
import { IUser } from './IUser';

export interface ILearning {
  _id: string;
  user: IUser;
  book: ILearningBook;
  state: boolean;
  price: number;
  condition: number;
  dateCreated: Date;
}
export interface ILearningBook {
  _id: string;
  name: string;
  evaluation: IEvaluation[];
  content: string;
}
