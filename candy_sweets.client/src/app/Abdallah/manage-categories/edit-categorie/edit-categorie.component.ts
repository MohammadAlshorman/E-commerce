import { Component } from '@angular/core';
import { AbdService } from '../Service/abd.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-categorie',
  standalone: false,
  templateUrl: './edit-categorie.component.html',
  styleUrl: './edit-categorie.component.css'
})
export class EditCategorieComponent {

  ngOnInit() { }

  categoryId: any

  constructor(private _ser: AbdService, private _active: ActivatedRoute) { }

  updatecategory(data: any) {
    this.categoryId = this._active.snapshot.paramMap.get("id")
    this._ser.editCategory(this.categoryId, data).subscribe(() => {

      alert("update successfully")
    })
  }

}
