import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

//* import Category service to perform the communication bewteen Client and Server
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../interfaces/category/category';

import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
	selector: 'app-create-category',
	templateUrl: './create-category.component.html',
	styleUrls: ['./create-category.component.scss']
})

export class CreateCategoryComponent implements OnInit {

  	CreateCategoryForm: FormGroup;
	category: Category;
	imageData: File;

  	constructor(protected router: Router, 
             	private categoryService: CategoryService,
				private snackBarService: SnackbarService) { 
  	}

	ngOnInit() {
		this.CreateCategoryForm = new FormGroup ({
			category_name: new FormControl('')
		});
	}

	onChooseFile(event){
		// console.log("event:", event.target.files[0]);
		this.imageData = event.target.files[0];
	}

	onSubmit() {
		// console.log(this.imageData);
		const categoryName = this.CreateCategoryForm.value.category_name;

		this.categoryService.storeCategory(categoryName, this.imageData).subscribe(
			(res) => {
				// console.log(res['status']);
				if(res['status'] === 1){
					this.snackBarService.showSuccessMessage(res['message']);
				}
				else{
					this.snackBarService.showErrorMessage(res['message']);
				}
			}
		)
	}  

}
