import { Component } from '@angular/core';
import { SuleimanserviceService } from '../suleimanservice.service';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor(private ser: SuleimanserviceService) { }

  ngOnInit() {
    this.getproduct()
  }
  categorylist: any

  getproduct() {
    this.ser.getAllCategory().subscribe((data) => {
      this.categorylist = data
    })
  }

}
