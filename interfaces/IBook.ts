import { IAutor } from "./IAutor"
import { ISubject } from "./ISubject"

export interface IBook {
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
  richDescription?: string
  evaluation?: string
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