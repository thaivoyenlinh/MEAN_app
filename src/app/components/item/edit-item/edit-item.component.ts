import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';

import { ItemService } from '../../../services/item/item.service';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../interfaces/category/category';

@Component({
	selector: 'app-edit-item',
	templateUrl: './edit-item.component.html',
	styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

	EditItemForm: FormGroup
	itemId: string
	listOfCategories: Category[]

	constructor(protected router: Router, 
				private fb: FormBuilder, 
				private route: ActivatedRoute,
				private itemService: ItemService,
				private categoryService: CategoryService) {
		
		this.categoryService.getListOfCategories().subscribe(
			(res) => {
				// console.log(res);
				this.listOfCategories = res;
			}
		)
		this.EditItemForm = this.fb.group({
			item_name_replace: new FormControl(''),
			item_price_replace: new FormControl(''),
			item_category_replace: new FormControl(this.listOfCategories),
			item_discription_replace: new FormControl(''),
		});

		this.route.queryParams.subscribe((params) => {
			this.itemId = params['id'];
		});

	}

	ngOnInit() {
		this.itemService.getItem(this.itemId).subscribe(
			(res) => {
				// console.log(res);
				const item = res['data'];
				this.EditItemForm.setValue({
				item_name_replace: item.item_name,
				item_price_replace: item.item_price, 
				item_category_replace: item.item_category, 
				item_discription_replace: item.item_discription, 
		});
			} 
		)
		
	}

	onSubmit() {
		// console.log(this.EditItemForm.value);
		// console.log("item id:", this.itemId);

		const item = this.EditItemForm.value;

		this.itemService.updateItem(this.itemId, item).subscribe(
			(res) => {
				if(res['status'] == 1){
					this.router.navigateByUrl('admin/item');
				}
				else {
					console.log(res['message']);
				}
			}
		)
	}

}
