import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { IOrder } from "interfaces";

@Injectable()
export class OrderEntityService extends EntityCollectionServiceBase<IOrder>{

  constructor(
    serviceElementsFactory:EntityCollectionServiceElementsFactory
  ){
    super('Order', serviceElementsFactory)
  }
}



