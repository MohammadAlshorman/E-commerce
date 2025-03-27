import { Component } from '@angular/core';
import { AbdService } from './Service/abd.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-categories',
  standalone: false,
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.css'
})
export class ManageCategoriesComponent {


  constructor(private ser: AbdService, private _active: ActivatedRoute) { }

  ngOnInit() {

    this.getData()
  }

  Categorys: any

  getData() {
    this.ser.getCategory().subscribe((data) => {

      this.Categorys = data;

    })
  }


  id: any
  deletecategory(id: any) {
    this.ser.deleteCategory(id).subscribe(() => {

      alert("Category Added")

    })
  }



}
