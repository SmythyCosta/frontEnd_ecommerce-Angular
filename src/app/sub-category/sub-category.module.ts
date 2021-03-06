import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { SubCategoryComponent } from './list/sub-category.component';
import { SubCategoryFormComponent } from './form/sub-category-form.component';
import { SubCategoryService } from '../_services/sub-category.service';
import { SubCategoryRoutes } from './sub-category.routes';
import { DataTablesModule } from 'angular-datatables';
import { DirectivasModule } from '../_directives/directives.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DataTablesModule,
        DirectivasModule,
        SubCategoryRoutes
        
    ],
    declarations: [SubCategoryComponent, SubCategoryFormComponent],
    exports: [
    ],
    providers: [SubCategoryService]
})
export class SubCategoryModule { }
