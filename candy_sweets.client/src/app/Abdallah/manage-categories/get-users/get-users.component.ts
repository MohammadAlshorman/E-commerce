import { Component } from '@angular/core';
import { AbdService } from '../Service/abd.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-users',
  standalone: false,
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent {
  Users: any = [];

  constructor(private ser: AbdService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.ser.getUsers().subscribe((data) => {
      this.Users = data;
    }, (error) => {
      this.showAlert('Error loading users!', 'error');
    });
  }

  deleteUsers(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ser.deleteUser(id).subscribe(() => {
          this.showAlert('User Deleted Successfully!', 'success');
          this.getData();
        }, (error) => {
          this.showAlert('Error deleting user!', 'error');
        });
      }
    });
  }

  showAlert(message: string, type: 'success' | 'error') {
    Swal.fire({
      icon: type,
      title: type === 'success' ? 'Success!' : 'Error!',
      text: message,
      confirmButtonColor: '#FF69B4'
    });
  }
}
