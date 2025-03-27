import { Component } from '@angular/core';
import { AbdService } from '../Service/abd.service';

@Component({
  selector: 'app-add-categorie',
  standalone: false,
  templateUrl: './add-categorie.component.html',
  styleUrl: './add-categorie.component.css'
})
export class AddCategorieComponent {


  constructor(private ser: AbdService) { }

  ngOnInit() {

  }

  Category: any


  addCategory(data: any) {

    this.Category = data;

    this.ser.addCategory(data).subscribe(() => {
      alert("Category Added")
    })

  }


}
