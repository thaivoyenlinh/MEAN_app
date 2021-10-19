import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Category } from '../../../interfaces/category/category';
import { Observable } from 'rxjs';

import { ItemService } from '../../../services/item/item.service';
import { CategoryService } from '../../../services/category/category.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
	selector: 'app-edit-item',
	templateUrl: './edit-item.component.html',
	styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

	EditItemForm: FormGroup
	itemId: string
	listOfCategories$: Observable<Category[]>

	config = {
		toolbar: [
			['bold', 'italic', 'underline'],
			[{ 'header': 1 }, { 'header': 2 }],
			[{ 'list': 'ordered'}, { 'list': 'bullet' }],
			[{ 'align': [] }],
			[{ 'size': ['small', false, 'large', 'huge'] }],  
			[{ 'font': [] }],
			['link', 'image']   
		]
	}

	constructor(protected router: Router, 
				private fb: FormBuilder, 
				private route: ActivatedRoute,
				private itemService: ItemService,
				private categoryService: CategoryService,
				private snackBarService: SnackbarService) {
		
		this.EditItemForm = this.fb.group({
			item_name_replace: new FormControl(''),
			item_price_replace: new FormControl(''),
			item_category_replace: new FormControl(''),
			item_type_replace: new FormControl(''),
			item_discription_replace: new FormControl(''),
		});

		this.route.queryParams.subscribe((params) => {
			this.itemId = params['id'];
		});

	}

	ngOnInit() {
		this.listOfCategories$ = this.categoryService.getListOfCategories();
		this.itemService.getItemById(this.itemId).subscribe(
			(res) => {
				const item = res;
				this.EditItemForm.setValue({
					item_name_replace: item.item_name,
					item_price_replace: item.item_price, 
					item_category_replace: item.item_category, 
					item_type_replace: item.item_type,
					item_discription_replace: item.item_discription, 
				});
			} 
		)
		
	}

	onSubmit() {
		const item = this.EditItemForm.value;
		this.itemService.updateItem(this.itemId, item).subscribe(
			(res) => {
				if(res['status'] == 1){
					this.snackBarService.showSuccessMessage(res['message']);
				}
				else {
					this.snackBarService.showErrorMessage(res['message']);
				}
			}
		)
	}

}
