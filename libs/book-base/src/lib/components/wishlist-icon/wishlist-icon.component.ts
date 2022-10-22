import { Component, Input, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'frontend-wishlist-icon',
  templateUrl: './wishlist-icon.component.html'
})
export class WishlistIconComponent implements OnInit {
  
  // @Input() wishlist : number

  
  constructor (private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe(wishlist =>{

      // this.wishlistCount = wishlist?.books.length ?? 0
    })
  }

}

