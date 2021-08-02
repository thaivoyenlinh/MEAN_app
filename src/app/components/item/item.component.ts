import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

import { Item } from '../../interfaces/item/item';
import { ItemService } from 'src/app/services/item/item.service';

// const DATA: Item[] = [
//   { item_name: 'Sugar', item_price: '1.20', item_category: 'lilimall', item_description: '1kg', item_image: ''},
//   { item_name: 'Candy', item_price: '2.20', item_category: 'lilimall', item_description: '500gram', item_image: ''}
// ];

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
				console.log("RES: ", res);
				const listOfItems = res['data'];
				this.dataSource = listOfItems;
			}
		)
	}	

	gotoEdit(item_name: string) {
		let navigationExtras: NavigationExtras = {
		queryParams: { name: item_name },
		};
		this.router.navigate(['/admin/item/edit'], navigationExtras);
	}

}
