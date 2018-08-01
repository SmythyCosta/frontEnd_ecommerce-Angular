import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

    cat = {};
    subCat: any[] = [];
    product = {};

    fileList: any;

    productAddForm: FormGroup;

    constructor(
        public router: Router,
        private dataService: ProductService
    ) { }

    ngOnInit() {

        /**
         * FormGroup = productAddForm
         * https://angular.io/guide/reactive-forms
         * 8 - inputs
         * 1 - upload de arquivo
         */
        this.productAddForm = new FormGroup({
            serial_number: new FormControl(""),
            name: new FormControl("", Validators.compose([Validators.required])),
            category: new FormControl("", Validators.compose([Validators.required])),
            subCategory: new FormControl(""),
            purchase_price: new FormControl("", Validators.compose([Validators.required])),
            selling_price: new FormControl("", Validators.compose([Validators.required])),
            note: new FormControl(""),
            status: new FormControl(""),
        });

        /**
         * Retorn o Json de categorias 
         * do Serviço Product
         * 
         * Vai popular o select
         * <select formControlName="category">
         */
        this.dataService.getCategory()
            .subscribe(data => {
                this.cat = data.cat;
            });
    }


    selectCat(id) {
        this.dataService.getSubCategory(id)
            .subscribe(data => {
                this.subCat = data.subCat;
            });
    }


    save(val) {
        this.insertAction(val);
    }


    insertAction(val) {

        let formData: FormData = new FormData();

        if (this.fileList != undefined) {
            let file: File = this.fileList[0];
            formData.append('file', file, file.name);
        }

        formData.append('serial_number', this.productAddForm.value.serial_number);
        formData.append('name', this.productAddForm.value.name);
        formData.append('category', this.productAddForm.value.category);
        formData.append('subCategory', this.productAddForm.value.subCategory);
        formData.append('purchase_price', this.productAddForm.value.purchase_price);
        formData.append('selling_price', this.productAddForm.value.selling_price);
        formData.append('note', this.productAddForm.value.note);
        formData.append('status', this.productAddForm.value.status);

        if (val.id == undefined) {
            this.dataService.save(formData)
                .subscribe(data => {
                    this.product = {};
                    alert('Product Create successful');
                }, error => {
                    alert(error);
                });
        } else {
            formData.append('id', val.id);
            this.dataService.productUpdate(formData)
                .subscribe(data => {
                    alert('Product Update successful');
                    this.router.navigate(['/product']);
                }, error => {
                    alert(error);
                });
        }
    }

}
