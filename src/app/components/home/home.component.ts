import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { Category } from '../../interfaces/category/category';
import { Item } from '../../interfaces/item/item';
import { CategoryService } from '../../services/category/category.service';
import { ItemService } from "../../services/item/item.service";

import { Observable } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  	categories$: Observable<Category[]>;
	item$: Observable<Item[]>;
	searchText: FormControl = new FormControl('');
	Search: FormGroup;
	newItem$: Observable<Item[]>;

	constructor(private router: Router,
				private categoryService: CategoryService,
				private itemService: ItemService,
				) { }
	
	ngOnInit() {
		this.init();
	}

	init(){
		this.categories$ = this.categoryService.getListOfCategories();
		this.Search = new FormGroup ({
			searchText: new FormControl('')
		})

		this.newItem$ = this.itemService.getListOfItems();
	}	

	onSearch(){
		// console.log("Value: ", this.Search.value);
		const valueSearch = this.Search.get('searchText').value;
		// console.log(valueSearch);
		let navigationExtrasSearch: NavigationExtras = {
			queryParams: {searchText: valueSearch},
		};
		this.router.navigate(['/listitem'], navigationExtrasSearch);
	}
	
	selectCategory(categoryName: string){
		// console.log	(categoryName);
		let navigationExtras: NavigationExtras = {
			queryParams: { name: categoryName},
		};
		this.router.navigate(['/listitem'], navigationExtras);
	}

	selectItem(itemId: string){
		let navigationExtras: NavigationExtras = {
			queryParams: { Id: itemId},
		};
		this.router.navigate(['/itemdetails'], navigationExtras);
	}

}
