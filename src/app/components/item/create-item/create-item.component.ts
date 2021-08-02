import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ItemService } from '../../../services/item/item.service';

@Component({
	selector: 'app-create-item',
	templateUrl: './create-item.component.html',
	styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  	CreateItemForm: FormGroup

	constructor(protected router: Router,
				private itemService: ItemService) { }

	ngOnInit() {
		this.CreateItemForm = new FormGroup ({
		item_name: new FormControl(''),
		item_price: new FormControl(''),
		item_category: new FormControl(''),
		item_discription: new FormControl(''),
		item_image: new FormControl(''),
		})
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
