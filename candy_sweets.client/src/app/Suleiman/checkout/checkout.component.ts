import { Component } from '@angular/core';
import { SuleimanserviceService } from '../suleimanservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(private ser: SuleimanserviceService, private _active: ActivatedRoute) { }
  priceafterdiscount: number = 0;
  ngOnInit() {
    this.getallitemfromcart()
    this.ser.carttotalprice$.subscribe((p: number) => {
      this.priceafterdiscount = p
      //alert(p)
      //alert(this.priceafterdiscount)
    })
  }
  cartitems: any
  getallitemfromcart() {
    this.ser.AllCartItems().subscribe((data) => {
      this.cartitems = data
      
    })
  }


  

}
