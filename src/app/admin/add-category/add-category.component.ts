import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../services/category.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  categories: any = [];
  category: any = {
    name: '',
  };
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res) => {
        this.categories = res['data'];
      },
      (err) => console.error(err),
      () => console.log('done loading categories')
    );
  }

  openModal() {
    return $('.modal-trigger').trigger('click');
  }

  closeModal() {
    return $('.modal-close').trigger('click');
  }

  resetCategory() {
    this.category = {
      name: '',
    };
  }

  createCategory() {
    this.categoryService.createCategory(this.category).subscribe(
      (res) => {
        this.getCategories();
        this.resetCategory();
      },
      (err) => console.error(err),
      () => console.log('done create category')
    );
  }

  editCategory(categoryId: number) {
    this.categoryService.getCategory(categoryId).subscribe(
      (data) => {
        this.category = data;
        this.openModal();
      },
      (err) => console.error(err),
      () => console.log('done loading category')
    );
  }

  updateCategory() {
    this.categoryService
      .updateCategory(this.category, this.category.id)
      .subscribe(
        (res) => {
          this.getCategories();
          this.resetCategory();
          this.closeModal();
        },
        (err) => console.error(err),
        () => console.log('done update category')
      );
  }

  deleteCategory(categoryId: number) {
    if (window.confirm('Are you sure?')) {
      this.categoryService.deleteCategory(categoryId).subscribe(
        (res) => {
          this.categories = res['data'];
          this.getCategories();
        },
        (err) => console.error(err),
        () => console.log('done delete category')
      );
    }
  }
}
