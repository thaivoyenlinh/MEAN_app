import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/'
import { map, tap } from 'rxjs/operators';

//! Interface tương tự cấu trúc tư định nghĩa. Import từ file interfaces/category (file định nghĩa)
import { Category } from '../../interfaces/category/category';
//!

//! send data without showing in URL
import { NavigationExtras } from '@angular/router';

//! call service from server
import { CategoryService } from '../../services/category/category.service';

//? Category infor được gán cứng tạm thời
// const ELEMENT_DATA: Category[] = [
// 	{ category_name: 'Hydrogen', category_avatar: 'H'},
// 	{ category_name: 'Lilimall', category_avatar: 'A'},
// ];

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {

	displayedColumns: string[] = ['category_name', 'category_avatar', 'action'];
	// dataSource = ELEMENT_DATA; //? Đang gán cứng, thay bằng DL lấy về
	// dataSource: Category[] = []; //? Khai báo và có thể khởi tạo giá trị là mảng rỗng
	
	SERVER_URL = 'http://localhost:4100/categories'

	categories$ : Observable<Category[]>;

	constructor(private router: Router, 
				private categoryService: CategoryService,) { }

	ngOnInit() {

		//* get data from server by subscribe() to emit value into Observable
		//* like console.log, data is saved in observable just display 
		//* when we call subcribe()
		this.categories$ =  this.categoryService.getListOfCategories();
		// .subscribe(
		// 	(res) => {
		// 		const listOfCategories = res;
		// 		// console.log(listOfCategories);
		// 		this.dataSource = listOfCategories;
		// 	},
		// )
	}

	deleteCategory(categoryId: string) {
		// console.log(row);
		this.categoryService.deleteCategory(categoryId).subscribe(
			(res) => {
				// console.log(res);
				if(res['status'] == 1){
					// update table, handle after
					// now use simple handle is reload page
					window.location.reload();
				}
				else {
					console.log(res['message']);
				}
			}
		);
	}

	editCategory(categoryId: string) {
		let navigationExtras: NavigationExtras = {
			queryParams: { id: categoryId },
		};
		this.router.navigate(['/admin/category/edit'], navigationExtras);
	}

}
