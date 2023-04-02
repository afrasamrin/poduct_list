import { Component } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  itemtitle : string = "" ;
  constructor(private productService: ProductsService) { } 


  ngOnInit(): void {
  
  this.productService.newname.subscribe(data => (
      this.itemtitle=data
    ));
  
    console.log(this.itemtitle)
    }
    

}
