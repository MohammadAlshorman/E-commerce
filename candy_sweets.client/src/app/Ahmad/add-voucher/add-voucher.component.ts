import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CustomerLoginRegistrationService } from '../../Omar/Service_User_API/customer-login-registration.service';

@Component({
  selector: 'app-add-voucher',
  standalone: false,
  templateUrl: './add-voucher.component.html',
  styleUrls: ['./add-voucher.component.css']
})
export class AddVoucherComponent implements OnInit {
  voucher = {
    voucher: '',
    discount: 0,
    userId: 'all'
  };

  isEditMode: boolean = false;
  editVoucherId: string | null = null;

  users: any[] = [];
  vouchers: any[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: CustomerLoginRegistrationService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadVouchers();
  }

  loadUsers() {
    this.http.get<any[]>('https://67d293ba90e0670699be2925.mockapi.io/user').subscribe((res) => {
      this.users = res;
    });
  }

  loadVouchers() {
    this.http.get<any[]>('https://67e44f4e2ae442db76d3ee5f.mockapi.io/voucher').subscribe((res) => {
      this.vouchers = res;
    });
  }

  addVoucher() {
    if (this.isEditMode && this.editVoucherId) {
      this.http.put(`https://67e44f4e2ae442db76d3ee5f.mockapi.io/voucher/${this.editVoucherId}`, this.voucher).subscribe(() => {
        Swal.fire('Updated!', 'Voucher has been updated.', 'success');
        this.resetForm();
        this.loadVouchers();
      });
    } else {
      this.http.post('https://67e44f4e2ae442db76d3ee5f.mockapi.io/voucher', this.voucher).subscribe(() => {
        Swal.fire('Added!', 'Voucher has been added.', 'success');
        this.resetForm();
        this.loadVouchers();
      });
    }
  }

  editVoucher(v: any) {
    this.isEditMode = true;
    this.editVoucherId = v.id;
    this.voucher = {
      voucher: v.voucher,
      discount: v.discount,
      userId: v.userId
    };

    setTimeout(() => {
      const formElement = document.getElementById('voucherFormSection');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); 
  }


  deleteVoucher(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will delete this voucher!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`https://67e44f4e2ae442db76d3ee5f.mockapi.io/voucher/${id}`).subscribe(() => {
          Swal.fire('Deleted!', 'Voucher has been deleted.', 'success');
          this.loadVouchers();
        });
      }
    });
  }

  getUserNameById(userId: string) {
    if (userId === 'all') return 'All Users';
    const user = this.users.find(u => u.ID == userId);
    return user ? user.name : 'Unknown User';
  }

  resetForm() {
    this.voucher = { voucher: '', discount: 0, userId: 'all' };
    this.isEditMode = false;
    this.editVoucherId = null;
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
}
