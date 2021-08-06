import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ItemService } from '../../../services/item/item.service';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from 'src/app/interfaces/category/category';

@Component({
	selector: 'app-create-item',
	templateUrl: './create-item.component.html',
	styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  	CreateItemForm: FormGroup
	listOfCategories: Category[]

	constructor(protected router: Router,
				private itemService: ItemService,
				private categoryService: CategoryService) { }

	ngOnInit() {
		//get list of categories for item_category => import CategoryService
		this.categoryService.getListOfCategories().subscribe(
			(res) => {
				// const listOfCategories = res;
				//! console.log(listOfCategories.category_name); => can't return list of categories name
				//?  console.log(listOfCategories[0]['category_name']); => just return a category 
				
				// console.log(res);
				this.listOfCategories = res;
			}
		);

		this.CreateItemForm = new FormGroup ({
			item_name: new FormControl(''),
			item_price: new FormControl(''),
			item_category: new FormControl(this.listOfCategories),
			item_discription: new FormControl(''),
			item_image: new FormControl(''),
		});
	}

	onSubmit() {
		// console.log(this.CreateItemForm.value);

		const item = this.CreateItemForm.value;

		this.itemService.storeItem(item).subscribe(
			(res) => {
				if(res['status'] == 1){
					this.router.navigateByUrl('/admin/item');
				}
				else{
					console.log("Response from server: ", res['message']);	
				}
			}
		)
	}

}
