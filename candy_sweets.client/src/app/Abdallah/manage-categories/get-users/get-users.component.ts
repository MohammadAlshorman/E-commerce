import { Component } from '@angular/core';
import { AbdService } from '../Service/abd.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CustomerLoginRegistrationService } from '../../../Omar/Service_User_API/customer-login-registration.service';

@Component({
  selector: 'app-get-users',
  standalone: false,
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent {
  Users: any = [];

  constructor(private ser: AbdService, private router: Router, private authService: CustomerLoginRegistrationService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.ser.getUsers().subscribe((data) => {
      this.Users = data;
    },
    //  (error) => {
    //  this.showAlert('Error loading users!', 'error');
      //}
    );
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
        },
          //(error) => {
          //this.showAlert('Error deleting user!', 'error');
          //}
        );
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


  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out from the dashboard!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire({
          icon: 'success',
          title: 'Logged Out Successfully!',
          text: 'You have been logged out.',
          confirmButtonColor: '#FF69B4'
        }).then(() => {
          this.router.navigate(['/']);
        });
      }
    });
  }


  toggleUserRole(user: any) {
    const newRole = user.role.toLowerCase() === 'admin' ? 'user' : 'admin';
    const message = newRole === 'admin' ? `promote ${user.name} to Admin` : `demote ${user.name} to User`;

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${message}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${newRole === 'admin' ? 'Make Admin' : 'Make User'}`
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUser = { ...user, role: newRole };
        this.ser.updateUser(user.ID, updatedUser).subscribe(() => {
          this.showAlert(`${user.name} is now a ${newRole}!`, 'success');
          this.getData(); 
        },
          error => {
            this.showAlert('Error updating role!', 'error');
          });
      }
    });
  }




}
