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
	dataSource: Category[] = []; //? Khai báo và có thể khởi tạo giá trị là mảng rỗng
	
	SERVER_URL = 'http://localhost:4100/categories'

	constructor(private router: Router, 
				private categoryService: CategoryService,) { }

	ngOnInit() {

		//* get data from server by subscribe() to emit value into Observable
		//* like console.log, data is saved in observable just display 
		//* when we call subcribe()
		this.categoryService.getListOfCategories().subscribe(
			(res) => {
				const listOfCategories = res['data'];
				// console.log(listOfCategories);
				this.dataSource = listOfCategories;
			},

		)
	}

	gotoEdit(category_name: string) {
		// console.log("position", row.position)
		let navigationExtras: NavigationExtras = {
			queryParams: { name: category_name },
		};
		this.router.navigate(['/admin/category/edit'], navigationExtras);
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

}
