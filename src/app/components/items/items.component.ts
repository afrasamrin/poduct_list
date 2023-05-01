import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})

export class ItemsComponent {
  product :any = [];
  cart :any = [];
  id:any ;
  itemid : any ;
  total: number = 0;
  totalitems :number = 0;
  itemtitle : string = "" ;
  constructor(private productService: ProductsService) { } 

  ngOnInit(): void {
  this.productService.getProduct().subscribe((data)=>{
    console.log(data);
    this.product = data;

    this.price_();
///service for name, total, totalitems
    this.productService.newname.subscribe(data => (
      this.itemtitle=data))
    this.productService._total.subscribe(a => (
        this.total=a))
    this.productService._totalitems.subscribe(b => (
          this.totalitems=b))


  })
  }

  setname(){
        this.productService.changename(this.itemtitle);
  }

  settotal(){
    this.productService.changetotal(this.total);

  }

  settotalitems(){
    this.productService.changetotalitems(this.totalitems);

  }


  addtocart(item:any){
    this.itemid = item.id;
    this.id = this.cart.map((data:any) => data.id)
    var id = this.id.slice(-1);
    if(this.cart.length === 0 || this.itemid != id){
      this.cart.push(item);
    }

    this.itemtitle = item.title;
    this.totalitems = this.cart.length;

    var price = item.price
    this.grandTotal(price);
    this.setname();
    this.settotal();
    this.settotalitems();

    
  }

  grandTotal(price: any){
    this.total = price + this.total;
    return this.total;
  }

 price_(){

/* this.product.products.forEach((data:any) => this.newprice.push(
  Math.ceil(data.discountPercentage * data.price - data.price)
 ))
 console.log(this.newprice)*/

 this.product.products.forEach((obj:any) => 
  obj.price_new =  
    Math.ceil(obj.discountPercentage * obj.price - obj.price) )
console.log(this.product)
  return 
  ///this.newprice = this.discount *price - price;
 }
 

  // @Input()
  // count: number = 1;
  // allcount = [];
  // incrementCounter(obj:any) {
  //   var new_id = (JSON.stringify(obj.value.id));
  //   if(this.count<=9){
  //   this.count++;
  //   }
  //   this.cart.forEach((obj:any) => {
  //     obj.count_ =  this.count
  //    if(obj.id === new_id){
  //     obj.count_++;
  //     }
     
  // })
  // console.log(this.cart)
    
  // }
  // decrementCounter(obj:any) {
  //   var new_id = (JSON.stringify(obj.value.id));

  //   if(this.count>=2){
  //   this.count--;
  //   }

  //   this.cart.forEach((obj:any) => {
  //     if(this.cart.length === 0 || this.cart.length !== 0) {
  //       obj.count_ =  this.count
  //     } 
  //     if(obj.id === new_id) {
  //       obj.count_ =  this.count
  //     }  
  //   })
  //   console.log(this.cart)
     
  // }

 
  change1(obj:any){
    
    return obj.value.thumbnail;
  }
  
  change(obj:any){

    return (JSON.stringify(obj.value.title))
  }
  change2(obj:any){

    return (JSON.stringify(obj.value.price))
  }
  

  removeItem(obj:any){
    var num = (JSON.stringify(obj.value.id));
    var rupee = parseInt((JSON.stringify(obj.value.price)));
    var index = this.cart.findIndex((item: any) => item.id === num); 

    this.cart.splice(index,1);
    this.totalitems = this.cart.length;
    this.total -= rupee;
    console.log(this.total)
    console.log(this.totalitems)
    this.settotal();
    this.settotalitems();

  }
  
  

}


