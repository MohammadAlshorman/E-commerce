import { Component } from '@angular/core';
import { SuleimanserviceService } from '../suleimanservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  constructor(private ser: SuleimanserviceService, private _active: ActivatedRoute) { }
  id: any
  
  prodata: any
  prorating: any

  ngOnInit() {
    this.getproductduitid()
    this.getRatingByProductID()

  }

  getproductduitid() {
    this.id = this._active.snapshot.paramMap.get('id')
    //this.id=2
    this.ser.getProductbyid(this.id).subscribe((data) => {
      this.prodata = data
      console.log("data")
    })
  }

  getRatingByProductID() {
    this.ser.getRatingsForproduct().subscribe((data) => {
      this.prorating = data//بدنا نعرض الداتا بالريفيو html
      this.prorating = this.prorating.filter((p: any) => p.productId == this.id)
    })

  }

  addRatingForProduct(data: any) {
    this.ser.addRatingForproduct(data).subscribe(() => {
      alert('New Rating Has Been Added')
      this.getRatingByProductID()

    })

  }

  addToCart(data: any) {
    this.ser.addItemsToCart(data).subscribe(() => {
      alert('Product Has Been Added To Cart')
    })
  }

}
