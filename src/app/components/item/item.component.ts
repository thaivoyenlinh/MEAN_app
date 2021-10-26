import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { combineLatest, Observable, of, BehaviorSubject } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core';

import { Item } from '../../interfaces/item/item';
import { Category } from '../../interfaces/category/category';
import { ItemService } from 'src/app/services/item/item.service';
import { CategoryService } from '../../services/category/category.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { LoadingScreenService } from '../../services/loading-screen/loading-screen.service';

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

	displayedColumns: string[] = ['item_name', 'item_price', 'item_category', 'item_type', 'action'];
	// dataSource: Item[] = [];
	searchText: FormControl = new FormControl('');
	category: FormControl = new FormControl('');
	
	listOfCategories$: Observable<Category[]>;
	item$: Observable<Item[]>;
	search$: Observable<Item[]>;	
	filterSubject: BehaviorSubject<FilterCritiria> = new BehaviorSubject<FilterCritiria>({});

	itemData = new MatTableDataSource();
	// itemDataSource: Item[] = [];
	@ViewChild(MatPaginator, {static: false}) itemPaginator: MatPaginator;

	constructor(protected router: Router,
				private itemService: ItemService,
				private categoryService: CategoryService,
				private dialogService: DialogService,
				private snackBarService: SnackbarService,
				private loadingScreenService: LoadingScreenService) { }

	ngOnInit() {
		this.init();
	}
	
	onDelete(itemId: string){
		this.dialogService.openConfirmDialog().afterClosed().subscribe(res => {
			if(res){
				this.deleteItem(itemId);
			}
		})
	}

	deleteItem(itemId: string) {
		this.itemService.deleteItem(itemId).pipe(
			tap((res)=> {
				if(res['status'] == 1){
					this.init();
					this.snackBarService.showSuccessMessage(res['message']);
				}else{
					this.snackBarService.showErrorMessage(res['message']);
				}
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
		this.loadingScreenService.show();
		combineLatest([this.itemService.getListOfItems(), this.search$, this.filterSubject]).pipe(
			map(([items, searchResult, {category, priceRange}]) => {
				const sourceData = searchResult ? searchResult : items;
				return sourceData.filter((item) => {
					return (category ? category === item.item_category : true);
				}); 
			}),
			tap(
				(data)=> {
					this.itemData = new MatTableDataSource(data);
					this.itemData.paginator = this.itemPaginator;
					this.loadingScreenService.hide();
				},
			)
		).subscribe();
	}

	reset(){
		this.filterSubject.next({});
		this.searchText = new FormControl('');
		this.category = new FormControl('');
		this.init();	
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

	openItemDetailsDialog(row){
		this.dialogService.openItemDetailsDialog(row);
	}

}
