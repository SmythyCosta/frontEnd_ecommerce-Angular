import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { SubCategoryComponent }         from './sub-category.component';
import { SubCategoryFormComponent }     from './sub-category-form.component';
import { SubCategoryService }           from '../_services/sub-category.service';
import { SubCategoryRoutes }            from './sub-category.routes';
import { DataTablesModule }             from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DataTablesModule,
        SubCategoryRoutes
    ],
    declarations: [SubCategoryComponent, SubCategoryFormComponent],
    exports: [SubCategoryComponent, SubCategoryFormComponent],
    providers: [SubCategoryService]
})
export class SubCategoryModule { }
