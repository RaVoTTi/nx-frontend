import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }

  initWishlistLocalStorage(){
    const initWishlist = {
      books: []
    }

    const initWishlistJson = JSON.stringify(initWishlist)
    localStorage.setItem('wishlist', initWishlistJson)
  }
}
