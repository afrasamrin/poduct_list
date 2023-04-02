import { Component } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent {
  product :any = [];
  total: number = 0;
  totalitems : number = 0 ;
  constructor(private productService: ProductsService) { } 

  ngOnInit(): void {
  this.productService.getProduct().subscribe((data)=>{
    console.log(data);
    this.product = data;

    this.productService.newtotal.subscribe(a => (
      this.total=a
    ));
    
    this.productService.newtotalitems.subscribe(b => (
      this.totalitems=b
    ));

  })
  }
  


}
