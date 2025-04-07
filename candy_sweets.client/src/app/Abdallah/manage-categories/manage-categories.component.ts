import { Component } from '@angular/core';
import { AbdService } from './Service/abd.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomerLoginRegistrationService } from '../../Omar/Service_User_API/customer-login-registration.service';

@Component({
  selector: 'app-manage-categories',
  standalone: false,
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent {

  Categorys: any = [];
  isEditMode: boolean = false;
  editCategoryId: string = '';
  showCategoryModal: boolean = false;
  showDeleteModal: boolean = false;
  categoryToDeleteId: string = '';

  categoryFormData = { name: '', image: '' }; // تعديل لتخزين URL للصورة

  constructor(private ser: AbdService, private _active: ActivatedRoute, private router: Router, private authService: CustomerLoginRegistrationService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.ser.getCategory().subscribe((data) => {
      this.Categorys = data;
    });
  }

  openCategoryModal() {
    this.resetForm();
    this.showCategoryModal = true;
  }

  closeCategoryModal() {
    this.showCategoryModal = false;
  }

  addCategory() {
    if (this.categoryFormData.name.trim() === '') {
      this.showAlert('Please enter a category name.', 'error');
      return;
    }

    // إرسال البيانات بما فيها URL الصورة
    const formData = {
      name: this.categoryFormData.name,
      image: this.categoryFormData.image // إرسال URL الصورة
    };

    this.ser.addCategory(formData).subscribe(() => {
      this.showAlert('Category Added Successfully', 'success');
      this.getData();
      this.closeCategoryModal();
      this.resetForm();
    });
  }

  editCategory(category: any) {
    this.isEditMode = true;
    this.editCategoryId = category.id;
    this.categoryFormData = { name: category.name, image: category.image }; // استيراد URL الصورة
    this.showCategoryModal = true;
  }

  updateCategory() {
    if (this.categoryFormData.name.trim() === '') {
      this.showAlert('Please enter a category name.', 'error');
      return;
    }

    const formData = {
      name: this.categoryFormData.name,
      image: this.categoryFormData.image // إرسال URL الصورة
    };

    this.ser.editCategory(this.editCategoryId, formData).subscribe(() => {
      this.showAlert('Category Updated Successfully', 'success');
      this.getData();
      this.closeCategoryModal();
      this.resetForm();
    });
  }

  confirmDeleteCategory(id: any) {
    this.categoryToDeleteId = id;

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
        this.deleteCategory();
      }
    });
  }

  deleteCategory() {
    this.ser.deleteCategory(this.categoryToDeleteId).subscribe(() => {
      this.showAlert('Category Deleted Successfully', 'success');
      this.getData();
      this.closeDeleteModal();
    });
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.categoryToDeleteId = '';
  }

  resetForm() {
    this.categoryFormData = { name: '', image: '' }; // إعادة تعيين الحقول
    this.isEditMode = false;
    this.editCategoryId = '';
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
}
