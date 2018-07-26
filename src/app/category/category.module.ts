import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CategoryComponent, CategoryListComponent, CategoryFormComponent],
  exports: [CategoryComponent]
})
export class CategoryModule { }
