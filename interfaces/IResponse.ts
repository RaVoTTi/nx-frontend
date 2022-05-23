export * from './ISubject';

export interface IResponse<G = void> {
  ok: boolean;
  msg: string[];
  result?: G;
  token?: string;
}
