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
  // rating?: number
  // description?: string
  // numReviews?: number
}
