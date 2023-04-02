import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  setname() {
    throw new Error('Method not implemented.');
  }

  public count = 1;
  totalitems : any = 0 ;
  total : any = 0;
  public name : any = [];

  public itemtitle = new BehaviorSubject<any>(this.name) ;
  newname = this.itemtitle.asObservable();

  public _total = new BehaviorSubject<any>(this.total) ;
  newtotal = this._total.asObservable();

  public _totalitems = new BehaviorSubject<any>(this.totalitems) ;
  newtotalitems = this._totalitems.asObservable();

  public Subject = new Subject<any>();



  constructor(private http: HttpClient) { }
  ///service for name,total,totalitems
  changename(data:string){
    this.itemtitle.next(data);
  }
  changetotal(a:number){
    this._total.next(a);
  }
  changetotalitems(b:number){
    this._totalitems.next(b);
  }

  
  getProduct(){
    let option = {};
    return this.http.get('https://dummyjson.com/products',option);
  }



  addToCart(){
    let option = {};
    return this.http.get('https://dummyjson.com/products',option);
  }
}
