import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../service/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CustomerLoginRegistrationService } from '../../Omar/Service_User_API/customer-login-registration.service';

@Component({
  selector: 'app-manage-product',
  standalone: false,
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  @ViewChild('productFormRef') productFormRef!: ElementRef;

  products: any[] = [];
  categories: any[] = [];
  isEditMode = false;
  showProductModal = false;
  editProductId = '';
  showDeleteModal = false;
  productToDeleteId = '';

  productFormData = {
    name: '',
    price: 0,
    description: '',
    stock: 0,
    categoryId: '',
    imageUrl: ''
  };

  constructor(private productService: ProductService, private router: Router, private authService: CustomerLoginRegistrationService) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((response: any[]) => {
      this.products = response;
    }, (error) => this.showAlert('Error loading products!', 'error'));
  }

  loadCategories() {
    this.productService.getCategories().subscribe((response: any[]) => {
      this.categories = response;
    }, (error) => this.showAlert('Error loading categories!', 'error'));
  }

  onSubmit() {
    if (this.isFormValid()) {
      if (this.isEditMode) {
        this.productService.updateProduct(this.editProductId, this.productFormData).subscribe(() => {
          this.showAlert('Product Updated Successfully!', 'success');
          this.loadProducts();
          this.closeProductModal();
        }, (error) => this.showAlert('Error updating product!', 'error'));
      } else {
        this.productService.addProduct(this.productFormData).subscribe((response) => {
          this.products.push(response);
          this.showAlert('Product Saved Successfully!', 'success');
          this.closeProductModal();
        }, (error) => this.showAlert('Error saving product!', 'error'));
      }
    }
  }

  confirmDelete(product: any) {
    this.productToDeleteId = product.id;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct();
      }
    });
  }

  deleteProduct() {
    if (this.productToDeleteId) {
      this.productService.deleteProduct(this.productToDeleteId).subscribe(() => {
        this.products = this.products.filter(p => p.id !== this.productToDeleteId);
        this.showAlert('Product Deleted Successfully!', 'success');
      }, (error) => this.showAlert('Error deleting product!', 'error'));
    }
  }

  editProduct(product: any) {
    this.isEditMode = true;
    this.editProductId = product.id;
    this.productFormData = { ...product };
    this.showProductModal = true;
  }

  openProductModal() {
    this.resetForm();
    this.showProductModal = true;
  }

  closeProductModal() {
    this.showProductModal = false;
    this.resetForm();
  }

  resetForm() {
    this.productFormData = { name: '', price: 0, description: '', stock: 0, categoryId: '', imageUrl: '' };
    this.isEditMode = false;
    this.editProductId = '';
  }

  showAlert(message: string, type: string) {
    Swal.fire({
      icon: type === 'success' ? 'success' : 'error',
      title: type === 'success' ? 'Success' : 'Error',
      text: message,
      confirmButtonColor: '#FF69B4'
    });
  }

  isFormValid(): boolean {
    const { name, price, description, stock, categoryId, imageUrl } = this.productFormData;
    if (!name.trim() || !imageUrl.trim() || price <= 0 || !description.trim() || stock <= 0 || !categoryId.trim()) {
      this.showAlert('Please fill in all fields correctly!', 'error');
      return false;
    }
    return true;
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.productToDeleteId = '';
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
            this.router.navigate(['/Home/Login']);
        });
      }
    });
  }


}
