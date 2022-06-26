import { IAutor } from "./IAutor"
import { IEvaluation } from "./IEvaluation"
import { ISubject } from "./ISubject"

export interface IBook {
  _id:string
  autor: IAutor
  subject: ISubject
  name: string
  state: boolean
  isFeatured: boolean
  image: string
  minPrice: number
  maxPrice: number
  dateCreated: Date
  rating?: number
  description?: string
  evaluation?: IEvaluation[]
  content?: string
  numReviews?: number
}
// export interface IBookId {
//   autor: string
//   subject: string
//   name: string
//   state: boolean
//   isFeatured: boolean
//   image: string
//   price: number
//   dateCreated: Date
//   rating?: number
//   description?: string
//   richDescription?: string
//   evaluation?: string
//   content?: string
//   numReviews?: number
// }