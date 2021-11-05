import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

//! Interface tương tự cấu trúc tư định nghĩa. Import từ file interfaces/category (file định nghĩa)
import { Category } from '../../interfaces/category/category';

//! send data without showing in URL
import { NavigationExtras } from '@angular/router';

//! call service from server
import { CategoryService } from '../../services/category/category.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { LoadingScreenService } from '../../services/loading-screen/loading-screen.service';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {

	displayedColumns: string[] = ['category_name', 'category_image', 'action'];
	// categories$ : Observable<Category[]>;
	categoryData = new MatTableDataSource();

	@ViewChild(MatPaginator, {static: false}) categoryPaginator: MatPaginator;

	constructor(private router: Router, 
				private categoryService: CategoryService,
				private dialogService: DialogService,
				private snackBarService: SnackbarService,
				private loadingScreenService: LoadingScreenService,) { }

	ngOnInit() {
		this.init();
	}

	init() {
		// this.categories$ =  this.categoryService.getListOfCategories();
		this.loadingScreenService.show();
		this.categoryService.getListOfCategories().pipe(
			tap(
				(data) => {
					this.categoryData = new MatTableDataSource(data);
					this.categoryData.paginator = this.categoryPaginator;
				},
				(error) => {
					this.snackBarService.showErrorMessage(error.message);
				},
				() => {
					this.loadingScreenService.hide();
				}
			)
		).subscribe();
	}

	onDelete(categoryId: string){
		this.dialogService.openConfirmDialog('category').afterClosed().subscribe(res => {
			// console.log(res);
			if(res){
				this.deleteCategory(categoryId);
			}
		});
	}

	deleteCategory(categoryId: string) {
		// console.log(row);
		this.categoryService.deleteCategory(categoryId).pipe(
			tap((res) => {
				if(res['status'] == 1){
					this.init();
					this.snackBarService.showSuccessMessage(res['message']);
				}else{
					this.snackBarService.showErrorMessage(res['message']);
				}
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
