import { Component, OnInit } from '@angular/core';
import { CustomerLoginRegistrationService } from '../Service_User_API/customer-login-registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editprofile',
  standalone: false,
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit {
  user: any = {}; // Object to hold user data
  userId: any | null = null; // Logged-in user's ID
  showFooter: boolean = false;  // المتغير الذي يتحكم في إظهار الفوتر
  constructor(
    private user_api: CustomerLoginRegistrationService,
    private router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Subscribe to BehaviorSubject to get the logged-in user's ID
    this.user_api.userId$.subscribe((userId) => {
      if (userId) {
        this.userId = userId; // Save the user ID
        // Fetch user details from the API
        this.user_api.Get_User_Login().subscribe((data) => {
          this.user = data.find((u: any) => u.ID === userId);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No User Logged In',
          text: 'No user is logged in. Redirecting to login page.',
          confirmButtonColor: '#FF69B4'
        }).then(() => {
          this.router.navigate(['login']); // Redirect to login if no user is logged in
        });
      }
    });
  }

  // Method to update user details
  updateProfile() {
    if (this.userId) {
      this.user_api.Update_User(this.userId, this.user).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been updated successfully.',
          confirmButtonColor: '#FF69B4'
        }).then(() => {
          this.router.navigate(['/Home/Profile']); // Redirect to profile page
        });
      }, (error) => {
        console.error('Error updating profile:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an issue updating your profile. Please try again.',
          confirmButtonColor: '#FF69B4'
        });
      });
    }
  }

















  isPopupVisible: boolean = false; // Controls visibility of the popup
  imageOptions: string[] = [
    'https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o=',
    'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
    'https://static.thenounproject.com/png/5593059-200.png',
    'https://i.pinimg.com/736x/68/69/7e/68697ed39e4b7df530c3a61c1853b81a.jpg',
    'https://img.freepik.com/premium-vector/profile-default-icon-vector-design-template_1035722-1201.jpg?w=740',
    'https://img.freepik.com/free-vector/man-red-shirt-with-white-collar_90220-2873.jpg?ga=GA1.1.594949703.1744187886&semt=ais_hybrid&w=740',
  ];
  selectedImage: string | null = null;

  // Open the image selection popup
  openImagePopup(): void {
    this.isPopupVisible = true;
  }

  // Close the image selection popup
  closeImagePopup(): void {
    this.isPopupVisible = false;
  }

  // Handle image selection
  selectImage(imageUrl: string): void {
    this.user.image = imageUrl; // Update user's image URL
    this.selectedImage = imageUrl;
    this.closeImagePopup(); // Close the popup
  }

  // Handle form submission
  updateimg(): void {
    if (this.userId) {
      this.user_api.Update_User(this.userId, this.user).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Important Note:To Update Profile Image !',
          text: 'After choosing the image you want rember to click on save change button to save your new profile image',
          confirmButtonColor: '#FF69B4'
        }).then(() => {
          this.router.navigate(['/Home/EditProfile']); // Redirect to profile page
        });
      }, (error) => {
        console.error('Error updating profile:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an issue updating your profile. Please try again.',
          confirmButtonColor: '#FF69B4'
        });
      });
    }
  }


























  resetPassword() {
    this.router.navigate(['/Home/Reset']);
  }

  goBackToProfile() {
    this.router.navigate(['/Home/Profile']);
  }
  logout(): void {
    this.user_api.logout();
    this.router.navigate(['/Home/Login']);
  }
}
