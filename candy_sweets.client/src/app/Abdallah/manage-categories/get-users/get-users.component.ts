import { Component } from '@angular/core';
import { AbdService } from '../Service/abd.service';

@Component({
  selector: 'app-get-users',
  standalone: false,
  templateUrl: './get-users.component.html',
  styleUrl: './get-users.component.css'
})
export class GetUsersComponent {



  constructor(private ser: AbdService) { }

  ngOnInit() {

    this.getData()
  }

  Users: any

  getData() {
    this.ser.getUsers().subscribe((data) => {

      this.Users = data;

    })
  }



  deleteUsers(id: any) {
    this.ser.deleteUser(id).subscribe(() => {

      alert("User Deleted")
      this.getData();

    })
  }


}
