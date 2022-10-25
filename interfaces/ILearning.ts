import { IBook } from "./IBook"
import { IUser } from "./IUser"

export interface ILearning {
    _id: string
    user: IUser
    book: IBook
    state: boolean
    price: number
    condition: number
    dateCreated: Date
}