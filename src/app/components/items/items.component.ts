import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  discount :number = 0;
  newprice : number = 0;
  constructor(private productService: ProductsService) { } 

  ngOnInit(): void {
  this.productService.getProduct().subscribe((data)=>{
    console.log(data);
    this.product = data;

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
    this.discount = (item.discount / 100);
    var price = item.price
    this.grandTotal(price);
    this.price_(price);

    this.setname();
    this.settotal();
    this.settotalitems();
  }

  grandTotal(price: any){
    this.total   = price + this.total;
    return this.total;
  }

 price_(price: any){
  return this.newprice = this.discount *price - price;
 }
 

  @Input()
  count: number = 1;

  incrementCounter() {
    if(this.count<=9){
    this.count++;
    }
  }

  decrementCounter() {
    if(this.count>=2){
    this.count--;
    }
  }

 
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
     var index = this.cart.findIndex((item: any) => item.id === num);         
    this.cart.splice(index,1);
    return this.cart;
  
  }
  
  

}


