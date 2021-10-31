import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { Item } from '../../interfaces/item/item';
import { ItemService } from '../../services/item/item.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {


  	categoryName: string;
	listItem$: Observable<Item[]>;
	searchText: string;
	listItem: [];
	price: FormControl = new FormControl('');

  	constructor(private route: ActivatedRoute,
			  	private itemService: ItemService,
				protected router: Router){

		route.queryParams.subscribe((params) => {
			this.categoryName = params['name'];
		})

		route.queryParams.subscribe((paramSearch) => {
			this.searchText = paramSearch['searchText'];
		})
   	}

	ngOnInit() {
		this.init();
	}

	init(){
		// console.log("params search text: ",this.searchText);
		// console.log("params categoryName: ", this.categoryName);
		this.listItem$ = this.categoryName ? 
			this.itemService.getItemsBy('item_category', this.categoryName) :
			(this.searchText ? this.itemService.getItemsBy('item_name', this.searchText) : of(null)) 
	}

	filterItems(value: string){
		this.init();
		this.listItem$ = this.listItem$.pipe(
			map((data) => {
				let newValue = value.split("-");
				let minPrice = parseInt(newValue[0]);
				let maxPrice = parseInt(newValue[1]);
				return data.filter(d => this.formatPrice(d.item_price) >= minPrice && 
									this.formatPrice(d.item_price) <= maxPrice) 
			})
		)
	}

	formatPrice(price: string){
		//split: string method, join: array method
		let priceFormatted = price.includes(".") == true ? price.split(".").join("") : price.split(",").join(""); 
		return parseInt(priceFormatted);
	}

	sortItems(value: string){
		this.listItem$ = this.listItem$.pipe(
			map((data) => { 
				//sort: array method
				data.sort((a,b) => {
					if(value === 'low'){
						return this.formatPrice(a.item_price) < this.formatPrice(b.item_price) ? -1 : 1;
					}else {
						return this.formatPrice(a.item_price) > this.formatPrice(b.item_price) ? -1 : 1;
					}
				});
				return data; 
			})
		)
	}

	selectItem(itemId: string){
		console.log(itemId);
		let navigationExtras: NavigationExtras = {
			queryParams: { Id: itemId},
		};
		this.router.navigate(['/itemdetails'], navigationExtras);
	}

}
