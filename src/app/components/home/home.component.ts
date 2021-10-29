import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Category } from '../../interfaces/category/category';
import { Item } from '../../interfaces/item/item';
import { CategoryService } from '../../services/category/category.service';

import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

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

	constructor(private router: Router,
				private categoryService: CategoryService,
				) { }
	
	ngOnInit() {
		this.categories$ = this.categoryService.getListOfCategories();
		this.Search = new FormGroup ({
			searchText: new FormControl('')
		})
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

}
