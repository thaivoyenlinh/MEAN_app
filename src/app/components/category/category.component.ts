import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

//! Interface tương tự cấu trúc tư định nghĩa. Import từ file interfaces/category (file định nghĩa)
import { Category } from '../../interfaces/category/category';
//!

//! send data without showing in URL
import { NavigationExtras } from '@angular/router';

//! call service from server
import { CategoryService } from '../../services/category/category.service'
import { HttpClient } from '@angular/common/http';

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
				private categoryService: CategoryService,
				private http: HttpClient) { }

	ngOnInit() {

		//* get data from server by subscribe() to emit value into Observable
		// this.categoryService.getListOfCategories().subscribe(
		// 	(res) => {
		// 		console.log('testtt');
		// 		console.log(res);
		// 	}
		// );
		// this.categoryService.getListOfCategories().pipe(
		// 	tap((res) => { console.log(res)})
		// ).subscribe();
		this.http.get(this.SERVER_URL).subscribe(res => console.log(res));
	}

	gotoEdit(category_name: string) {
		// console.log("position", row.position)
		let navigationExtras: NavigationExtras = {
			queryParams: { name: category_name },
		};
		this.router.navigate(['/admin/category/edit'], navigationExtras);
	}

}
