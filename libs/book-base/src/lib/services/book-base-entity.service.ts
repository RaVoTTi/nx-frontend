import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { IBook } from "interfaces";

@Injectable()
export class BookBaseEntityService extends EntityCollectionServiceBase<IBook>{

  constructor(
    serviceElementsFactory:EntityCollectionServiceElementsFactory
  ){
    super('Book', serviceElementsFactory)
  }
}



