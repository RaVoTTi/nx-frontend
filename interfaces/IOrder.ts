import { IBook } from "./IBook"
import { IUser } from "./IUser"

export interface IOrder {
    _id: string
    user: IUser
    book: IBook
    state: boolean
    price: number
    condition: number
    dateCreated: Date
}