import { Component } from '@angular/core';
import { SuleimanserviceService } from '../suleimanservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(private ser: SuleimanserviceService, private _active: ActivatedRoute) { }
  id: any
  ngOnInit() {
    this.id = this._active.snapshot.paramMap.get('id')
    this.showProductBycategoryId(this.id)
    this.getProductByCategoryID();
  }
  productData: any
  showProductBycategoryId(id: any) {
    this.ser.getAllProduct().subscribe((data) => {
      this.productData = data
      this.productData = this.productData.filter((p: any) => p.categoryId == id)
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
