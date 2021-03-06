import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';

const productRoutes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'form', component: ProductFormComponent },
    { path: 'form/:id', component: ProductFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(productRoutes)],
    exports: [RouterModule]
})
export class ProductRoutes { }
