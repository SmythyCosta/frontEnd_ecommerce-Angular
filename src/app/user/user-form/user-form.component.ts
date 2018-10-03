import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService, UserService, AppService } from '../../_services/index';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {

    public titlePage: String = "Sub Category";
    public titleBarNavegation: String = "Add";
    userType = [{id:1,name:'Admin'},{id:2,name:'user'}];

    user = {
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        type: '',
        status: '',
        image: ''
    };
    getUser = {
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        type: '',
        status: '',
        image: ''
    };

    @Input() allowMultiple: boolean;
    @Input() fileType: string;
    @Input() required: boolean;
    @Input() maxSizeInKb: number;
    @Output() onSelection = new EventEmitter<FileList>(); DisplayedText: string = "";

    fileList: any;
    userAddForm: FormGroup;

    constructor(public router: Router,
        private routeParams: ActivatedRoute,
        private dataService: UserService,
        private alertService: AlertService,
        private AppService: AppService,
        private elementRef: ElementRef
    ) { }

    ngOnInit() {
        this.checkIssetID();
        this.formGroupValidation();
    }

    /**
     * @param val 
     * Salva os Inputs do formulario
    */
    save(val) {
        //
        this.insertAction(val);
    }

    /**
     * @param val 
     * Trata a inserção dos arquivos.
    */
    insertAction(val) {
        let formData: FormData = new FormData();
        if (this.fileList != undefined) {
            let file: File = this.fileList[0];
            formData.append('file', file, file.name);
        }
        formData.append('name', this.user.name);
        formData.append('email', this.user.email);
        formData.append('phone', this.user.phone);
        formData.append('address', this.user.address);
        formData.append('password', this.user.password);
        formData.append('type', this.user.type);
        formData.append('status', this.user.status);

        if (val.id == undefined || val.id == '') {
            this.dataService.save(formData)
                .pipe().subscribe(data => {
                    if (data['status'] == 200) {
                        this.alertService.success('User Create successful', true);
                    } else if (data['status'] == 300) {
                        this.alertService.success('User already exists', true);
                    }
                }, error => {
                    this.alertService.error(error);
                });
        } else {
            formData.append('id', val.id);
            this.dataService.userUpdate(formData)
                .pipe().subscribe(data => {
                    if (data['status'] == 200) {
                        this.alertService.success('User Update successful', true);
                    } else if (data['status'] == 300) {
                        this.alertService.error('User already exists', true);
                    }
                }, error => {
                    this.alertService.error(error);
                });
        }
    }

    /**
     * @param id 
     * Edição de Entity
    */
    edit(id) {
        this.dataService.getUser(id)
            .pipe().subscribe(data => {
            this.getUser = data['user'];
                this.user = {
                    id: this.getUser.id,
                    name: this.getUser.name,
                    email: this.getUser.email,
                    phone: this.getUser.phone,
                    address: this.getUser.address,
                    password: '',
                    type: this.getUser.type,
                    status: this.getUser.status,
                    image: this.getUser.image
                };
            });
    }

    /**
     * Verifica se existe ID
     * na rota.
     * sim => edit
     * nao => new
    */
    checkIssetID() {
        this.routeParams.params.forEach((params: Params) => {
            let id: number = +params['id'];
            if (id) {
                this.titleBarNavegation = "Edit";
                this.edit(id);
            }
        });
    }

    /**
     * FormGroup = productAddForm
     * https://angular.io/guide/reactive-forms
     * 7 - inputs
     * 1 - upload de arquivo
     */
    formGroupValidation(): any {
        this.userAddForm = new FormGroup({
            name: new FormControl("", Validators.compose([Validators.required])),
            email: new FormControl("", Validators.compose([Validators.required])),
            phone: new FormControl("", Validators.compose([Validators.required])),
            address: new FormControl("", Validators.compose([Validators.required])),
            password: new FormControl("", Validators.compose([Validators.required])),
            type: new FormControl("", Validators.compose([Validators.required])),
            status: new FormControl("", Validators.compose([Validators.required])),
        });
    }

}
