import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ItemService } from '../../../services/item/item.service';
import { CategoryService } from '../../../services/category/category.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { Category } from 'src/app/interfaces/category/category';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-create-item',
	templateUrl: './create-item.component.html',
	styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  	CreateItemForm: FormGroup;
	listOfCategories$: Observable<Category[]>;
	imageData: File[];

	config = {
		toolbar: [
			['bold', 'italic', 'underline'],
			[{ 'header': 1 }, { 'header': 2 }],
			[{ 'list': 'ordered'}, { 'list': 'bullet' }],
			[{ 'align': [] }],
			[{ 'size': ['small', false, 'large', 'huge'] }],  
			['link', 'image']   
		]
	}

	constructor(protected router: Router,
				private itemService: ItemService,
				private categoryService: CategoryService,
				private snackBarService: SnackbarService) { }

	ngOnInit() {
		this.listOfCategories$ = this.categoryService.getListOfCategories();
		this.CreateItemForm = new FormGroup ({
			item_name: new FormControl(''),
			item_price: new FormControl(''),
			item_category: new FormControl(''),
			item_type: new FormControl(''),
			item_discription: new FormControl(''),
		});
	}

	onUploadFiles(event) {
		const files = event.target.files;
		this.imageData = files;
	}

	onSubmit() {
		this.itemService.storeItem(this.CreateItemForm.value, this.imageData).subscribe(
			(res) => {
				console.log(res);
				if(res['status'] == 1){
					this.snackBarService.showSuccessMessage(res['message']);
					// console.log(res['message']);
				}
				else{
					this.snackBarService.showErrorMessage(res['message']);
				}
			}
		)
	}

}
