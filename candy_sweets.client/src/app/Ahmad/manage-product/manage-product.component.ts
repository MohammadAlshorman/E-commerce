import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../service/product.service';

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

  showToast = false;
  toastMessage = '';
  toastType = 'success';

  productFormData = {
    name: '',
    price: 0,
    description: '',
    stock: 0,
    categoryId: '', 
    imageUrl: ''
  };

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories(); 
  }

  loadProducts() {
    this.productService.getProducts().subscribe((response: any[]) => {
      this.products = response;
    }, (error) => console.error('Error loading products:', error));
  }

  loadCategories() { 
    this.productService.getCategories().subscribe((response: any[]) => {
      this.categories = response;
    }, (error) => console.error('Error loading categories:', error));
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
    this.showDeleteModal = true;
  }

  deleteProduct() {
    if (this.productToDeleteId) {
      this.productService.deleteProduct(this.productToDeleteId).subscribe(() => {
        this.products = this.products.filter(p => p.id !== this.productToDeleteId);
        this.showAlert('Product Deleted Successfully!', 'success');
        this.cancelDelete();
      }, (error) => this.showAlert('Error deleting product!', 'error'));
    }
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.productToDeleteId = '';
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
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
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

}
