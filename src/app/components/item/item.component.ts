import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

import { Item } from '../../interfaces/item/item';
import { ItemService } from 'src/app/services/item/item.service';
import { combineLatest, Observable, of } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

	displayedColumns: string[] = ['item_name', 'item_price', 'item_category', 'item_discription', 'item_image', 'action'];
	// dataSource: Item[] = [];
	item$: Observable<Item[]>
	searchText: FormControl = new FormControl('');
	search$: Observable<Item[]>

	SERVER_URL = 'http://localhost:4100/items'

	constructor(protected router: Router,
				private itemService: ItemService) { }

	ngOnInit() {
		this.init();
	}	

	deleteItem(itemId: string) {
		// console.log(row);
		this.itemService.deleteItem(itemId).pipe(
			tap(()=> {
				this.init();
			})
		).subscribe();
	}

	init() {
		// this.item$ = this.itemService.getListOfItems();
		this.search$ = this.searchText.valueChanges.pipe(
			startWith(''),
			tap((data) => {console.log(data)}),
			debounceTime(200),
			distinctUntilChanged(),
			switchMap((data) => data ? this.itemService.getItemByName(data) : of(null)),
			map(res => res && res['data']),
			tap((data) => console.log(data)),
		)
		this.item$ = combineLatest([this.itemService.getListOfItems(), this.search$]).pipe(
			map(([items, searchResult]) => {
				const sourceData = searchResult ? searchResult : items;
				return sourceData; 
			})
		)
	}

	editItem(itemId: string) {
		let navigationExtras: NavigationExtras = {
		queryParams: { id: itemId },
		};
		this.router.navigate(['/admin/item/edit'], navigationExtras);
	}

}
