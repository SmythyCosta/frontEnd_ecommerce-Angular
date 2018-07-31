import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { ProductComponent }         from './product-list/product.component';
import { ProductFormComponent }     from './product-form/product-form.component';


const productRoutes: Routes = [
    { path: 'product',                  component: ProductComponent },
    { path: 'product/form',             component: ProductFormComponent },
    { path: 'product/form/:id',         component: ProductFormComponent }
];


@NgModule({
    imports: [RouterModule.forChild(productRoutes)],
    exports: [RouterModule]
})
export class ProductRoutes { }