import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Category } from '../../interfaces/category/category';
import { CategoryService } from '../../services/category/category.service';
import { NavigationExtras } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  	categories$: Observable<Category[]>;
  
	constructor(private router: Router,
				private categoryService: CategoryService) { }

	ngOnInit() {
		this.categories$ = this.categoryService.getListOfCategories();
	}

	selectCategory(categoryName: string){
		// console.log	(categoryName);
		let navigationExtras: NavigationExtras = {
			queryParams: { name: categoryName},
		};
		this.router.navigate(['/listitem'], navigationExtras);
	}

}
