import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
//! FormBuilder có hàm group ( nhóm các FormControl ) có tác dụng tương tự new FormGroup (tạo object)
//! Router dùng navigate... để điều hướng về một trang mong muốn (php: location)

//! ActivatedRoute to catch a URL parameter

import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

	EditCategoryForm: FormGroup
	
	//? declare in both send and receive component
	categoryId: string 
	
	//* Router to catch the data form Category Component
	constructor(protected router: Router, 
				private fb: FormBuilder, 
				private route: ActivatedRoute,
				private categoryService: CategoryService) {

			this.EditCategoryForm = this.fb.group({
				category_name_replace: new FormControl(''),
				category_avatar_replace: new FormControl(''),
		});
		
		//! catch the data 
		this.route.queryParams.subscribe((params) => {
			//? params['variable']: variable name in here (receice component) 
			//? same variable name in category.component(send component)	
			this.categoryId = params['id'];
		}); 
		
	}

	ngOnInit() {
		// this.EditCategoryForm.setValue({
		// 	category_name_replace: 'thaivoyenlinh',
		// 	category_avatar_replace: 'b1809476',
		// });
		//? send request to server to get data of category want to edit by call API
		//? in here get data inspect (console.log)
		//? response from server was loaded into edit form (category.category_name,...)
		this.categoryService.getCategory(this.categoryId).subscribe(
			(res) => {
				// console.log(res);
				const category = res['data'];
				this.EditCategoryForm.setValue({
					category_name_replace: category.category_name,
					category_avatar_replace: category.category_avatar,
				});
			}
		);
		
	}

	onSubmit() {
		// console.log(this.EditCategoryForm.value);
		//? get successfully category id
		// console.log("category id: " ,this.categoryId);

		//! submit form and update new data 
		const newCategory = this.EditCategoryForm.value;
		// console.log(newCategory);
		//* call update API 
		this.categoryService.updateCategory(this.categoryId, newCategory).subscribe(
			(res) => {
				// console.log(res);
				if(res['status'] == 1){
					this.router.navigateByUrl('/admin/category');
				}
				else {
					console.log(res['message']);
				}
			}
		);
	}	

}
