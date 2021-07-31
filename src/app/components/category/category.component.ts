import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

//! Interface tương tự cấu trúc tư định nghĩa. Import từ file interfaces/category (file định nghĩa)
import { Category } from '../../interfaces/category/category';
//!

//! send data without showing in URL
import { NavigationExtras } from '@angular/router';

//! call service from server
import { CategoryService } from '../../services/category/category.service';

//? Category được import 
const ELEMENT_DATA: Category[] = [
	{ category_name: 'Hydrogen', category_avatar: 'H'},
	{ category_name: 'Lilimall', category_avatar: 'A'},
];

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {

	displayedColumns: string[] = ['category_name', 'category_avatar', 'action'];
	dataSource = ELEMENT_DATA;
	SERVER_URL = 'http://localhost:4100/categories'

	constructor(private router: Router, 
				private categoryService: CategoryService,) { }

	ngOnInit() {

		//* get data from server by subscribe() to emit value into Observable
		//* like console.log, data is saved in observable just display 
		//* when we call subcribe()
		this.categoryService.getListOfCategories().subscribe(
			(res) => {
				console.log("RESPONSE: ", res);
			},
			(error) => {
				console.log("ERROR: ", error);
			}
		)
	}

	gotoEdit(category_name: string) {
		// console.log("position", row.position)
		let navigationExtras: NavigationExtras = {
			queryParams: { name: category_name },
		};
		this.router.navigate(['/admin/category/edit'], navigationExtras);
	}

}
