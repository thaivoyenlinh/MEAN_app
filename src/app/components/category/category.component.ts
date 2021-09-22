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
import { DialogService} from '../../services/dialog/dialog.service';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit  {

	displayedColumns: string[] = ['category_name', 'category_image', 'action'];
	categories$ : Observable<Category[]>;

	constructor(private router: Router, 
				private categoryService: CategoryService,
				private dialogService: DialogService) { }

	ngOnInit() {
		this.init();
	}

	init() {
		this.categories$ =  this.categoryService.getListOfCategories();
	}

	onDelete(categoryId: string){
		this.dialogService.openConfirmDialog().afterClosed().subscribe(res => {
			// console.log(res);
			if(res){
				this.deleteCategory(categoryId);
			}
		});
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
