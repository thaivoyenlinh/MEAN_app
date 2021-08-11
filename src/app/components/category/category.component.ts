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
		this.init();
	}

	init() {
		this.categories$ =  this.categoryService.getListOfCategories();
	}

	deleteCategory(categoryId: string) {
		// console.log(row);
		this.categoryService.deleteCategory(categoryId).pipe(
			tap(() => {
				this.init();
			})
		).subscribe();
	}

	editCategory(categoryId: string) {
		let navigationExtras: NavigationExtras = {
			queryParams: { id: categoryId },
		};
		this.router.navigate(['/admin/category/edit'], navigationExtras);
	}

}
