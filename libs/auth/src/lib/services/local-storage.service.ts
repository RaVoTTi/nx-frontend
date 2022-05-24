import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  TOKEN = 'super-token'


  setToken(data : string){
    return localStorage.setItem(this.TOKEN, data)
  }
  getToken(){
    return localStorage.getItem(this.TOKEN)
  }
  deleteToken(){
   localStorage.removeItem(this.TOKEN)
  }
}
