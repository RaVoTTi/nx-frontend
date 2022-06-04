import { Injectable } from '@angular/core';
import { IWishlist } from 'interfaces';

export const WISHLIST_KEY = 'wishlist'

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  initWishlist : IWishlist = {
    books: []
  }
  constructor() { }

  initWishlistLocalStorage(){


    const initWishlistJson = JSON.stringify(this.initWishlist)
    localStorage.setItem(WISHLIST_KEY, initWishlistJson)
  }
  setBookWishlist(bookId: string) : IWishlist{
    const wishlistRaw = localStorage.getItem(WISHLIST_KEY)
    const wishlist : IWishlist= wishlistRaw ? JSON.parse(wishlistRaw) : this.initWishlist
    wishlist.books.push(bookId)
    return wishlist

  } 
}
