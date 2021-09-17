import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { Item } from '../../interfaces/item/item';
import { ItemService } from 'src/app/services/item/item.service';
import { combineLatest, Observable, of, BehaviorSubject } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Category } from '../../interfaces/category/category';
import { CategoryService } from '../../services/category/category.service';

interface FilterCritiria {
	category ?: string,
	priceRange ?: object
}

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

	displayedColumns: string[] = ['item_name', 'item_price', 'item_category', 'item_discription', 'action'];
	// dataSource: Item[] = [];
	searchText: FormControl = new FormControl('');
	category: FormControl = new FormControl('');
	
	listOfCategories$: Observable<Category[]>;
	item$: Observable<Item[]>;
	search$: Observable<Item[]>;	
	filterSubject: BehaviorSubject<FilterCritiria> = new BehaviorSubject<FilterCritiria>({});

	constructor(protected router: Router,
				private itemService: ItemService,
				private categoryService: CategoryService) { }

	ngOnInit() {
		this.init();
	}	

	deleteItem(itemId: string) {
		this.itemService.deleteItem(itemId).pipe(
			tap(()=> {
				this.init();
			})
		).subscribe();
	}

	init() {
		this.listOfCategories$ = this.categoryService.getListOfCategories();

		this.search$ = this.searchText.valueChanges.pipe(
			startWith(''),
			tap((data) => {console.log(data)}),
			// debounceTime(200),
			distinctUntilChanged(),
			switchMap((data) => data ? this.itemService.getItemByName(data) : of(null)),
			map(res => res && res['data']),
			tap((data) => console.log(data)),
		);
		this.item$ = combineLatest([this.itemService.getListOfItems(), this.search$, this.filterSubject]).pipe(
			map(([items, searchResult, {category, priceRange}]) => {
				const sourceData = searchResult ? searchResult : items;
				return sourceData.filter((item) => {
					return (category ? category === item.item_category : true);
				}); 
			}) 
		);
	}

	reset(){
		this.init;
		this.filterSubject.next({});
	}

	selectFilter(filterValue: string) {
		// console.log(filterValue);
		let currentObj = this.filterSubject.getValue();
		console.log(currentObj);
		this.filterSubject.next({		
			...currentObj,
			category: filterValue,
		});
	}

	editItem(itemId: string) {
		let navigationExtras: NavigationExtras = {
			queryParams: { id: itemId },
		};
		this.router.navigate(['/admin/item/edit'], navigationExtras);
	}

}
