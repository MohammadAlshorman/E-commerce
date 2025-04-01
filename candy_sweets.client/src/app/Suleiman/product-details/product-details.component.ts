import { Component } from '@angular/core';
import { SuleimanserviceService } from '../suleimanservice.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


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
    this.getProductByCategoryID()

  }

  getproductduitid() {
    this.id = this._active.snapshot.paramMap.get('id')
    //this.id=2
    this.ser.getProductbyid(this.id).subscribe((data) => {
      this.prodata = data
      
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
      //Swal.fire('New Rating Has Been Added')
      Swal.fire({
        title: "New Rating Has Been Added!",
        icon: "success",
        draggable: true
      });
      this.getRatingByProductID()

    })

  }

  addToCart(data: any) {
    this.ser.addItemsToCart(data).subscribe(() => {
      //Swal.fire('Product Has Been Added To Cart')
      Swal.fire({
        title: 'Added to cart!',
        html: `
      <div style="display: flex; justify-content: center; align-items: center;">
        <img src="https://cdn-icons-png.flaticon.com/512/3514/3514491.png" 
             style="width: 100px; animation: bounce 1s infinite;color:pink;">
      </div>
      <p style="margin-top: 10px;">The product has been successfully added to the cart.</p>
    `,
        showConfirmButton: false,
        timer: 2500, // إغلاق تلقائي بعد 1.5 ثانية
        customClass: {
          popup: 'custom-swal-popup'
        }
      });
    })
  }
  databycategoryid: any
  getProductByCategoryID() {
    this.ser.getAllProduct().subscribe((d) => {
      this.databycategoryid = d;
      
    })
  }

  getRandomFourItems() {
    return [...this.databycategoryid]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }

}
