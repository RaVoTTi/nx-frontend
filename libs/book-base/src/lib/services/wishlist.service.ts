import { Injectable, OnInit } from '@angular/core';
import { IWishlist } from '@frontend/utils';
import { BehaviorSubject } from 'rxjs';

export const WISHLIST_KEY = 'wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlist$ : BehaviorSubject<IWishlist> = new BehaviorSubject(this.getWishlist())

  initWishlist: IWishlist = {
    books: [],
  };
  initWishlistString = '{"books":[]}';
//  implements OnInit
  // ngOnInit(): void {
  // }

  initWishlistLocalStorage() {
    const oldWishlist = this.getWishlist();
    if (!oldWishlist) {
      const initWishlistJson = JSON.stringify(this.initWishlist);
      localStorage.setItem(WISHLIST_KEY, initWishlistJson);
    }
 
  }
  getWishlist(): IWishlist {
    const wishlistRaw = localStorage.getItem(WISHLIST_KEY);
    const wishlist: IWishlist = wishlistRaw
      ? JSON.parse(wishlistRaw)
      : this.initWishlist;
    return wishlist;
  }
  setBookWishlist(bookId: string): IWishlist {
    const wishlist = this.getWishlist();
    if (!wishlist.books.includes(bookId)) {
      wishlist.books.push(bookId);
      const wishlistString = JSON.stringify(wishlist);
      localStorage.setItem(WISHLIST_KEY, wishlistString);
      this.wishlist$.next(wishlist)
    }

    return wishlist;
  }
  deleteBookWishlist(bookId: string): IWishlist {
    const wishlist = this.getWishlist();
    if (wishlist.books.includes(bookId)) {
      const index = wishlist.books.indexOf(bookId);
      if (index !== -1) {
        wishlist.books.splice(index, 1);
      }
      const wishlistString = JSON.stringify(wishlist);
      localStorage.setItem(WISHLIST_KEY, wishlistString);
      this.wishlist$.next(wishlist)

    }

    return wishlist;
  }
  emptyBookWishlist(){
    localStorage.setItem(WISHLIST_KEY, this.initWishlistString);
    this.wishlist$.next(this.initWishlist)
  }
}
