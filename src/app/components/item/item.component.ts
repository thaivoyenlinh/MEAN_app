import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

import { Item } from '../../interfaces/item/item';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

	displayedColumns: string[] = ['item_name', 'item_price', 'item_category', 'item_discription', 'item_image', 'action'];
	dataSource: Item[] = [];

	SERVER_URL = 'http://localhost:4100/items'

	constructor(protected router: Router,
				private itemService: ItemService) { }

	ngOnInit() {
		this.itemService.getListOfItems().subscribe(
			(res) => {
				// console.log("RES: ", res);
				const listOfItems = res['data'];
				this.dataSource = listOfItems;
			}
		)
	}	

	deleteItem(itemId: string) {
		// console.log(row);
		this.itemService.deleteItem(itemId).subscribe(
			(res) => {
				// console.log(res);
				if(res['status'] == 1){
					window.location.reload();
				}
				else {
					console.log(res['message']);
				}
			} 
		);
	}

	editItem(itemId: string) {
		let navigationExtras: NavigationExtras = {
		queryParams: { id: itemId },
		};
		this.router.navigate(['/admin/item/edit'], navigationExtras);
	}

}
