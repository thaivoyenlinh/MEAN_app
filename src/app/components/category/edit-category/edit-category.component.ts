import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

	EditCategoryForm: FormGroup;
	
	//? declare in both send and receive component
	categoryId: string;
	imageData: File = null;
	
	//* Router to catch the data form Category Component
	constructor(protected router: Router, 
				private fb: FormBuilder, 
				private route: ActivatedRoute,
				private categoryService: CategoryService,
				private snackBarService: SnackbarService) {

			this.EditCategoryForm = this.fb.group({
				category_name_replace: new FormControl(''),
		});
		
		//! catch the data 
		this.route.queryParams.subscribe((params) => {
			this.categoryId = params['id'];
		}); 
		
	}

	onChooseFile(event){
		// console.log("EVENT:", event.target.files[0].name);
		this.imageData = event.target.files[0];
		// console.log(this.imageData);
	}

	ngOnInit() {
		this.categoryService.getCategory(this.categoryId).subscribe(
			(res) => {
				const category = res['data'];
				// console.log("Data:", category.category_image);
				this.EditCategoryForm.setValue({
					category_name_replace: category.category_name,
				});
			}
		);
	}

	onSubmit() {
		//! submit form and update new data
		const newCategoryName = this.EditCategoryForm.value.category_name_replace;
		// console.log("newCategoryName: ", newCategoryName);
		// console.log("imageData: ",this.imageData);
		// * call update API 
		if(this.imageData !== null){
			this.categoryService.updateAllFieldCategory(this.categoryId, newCategoryName, this.imageData).subscribe(
			(res) => {
				// console.log(res);
				if(res['status'] == 1){
					this.snackBarService.showSuccessMessage(res['message']);
				}
				else {
					this.snackBarService.showErrorMessage(res['message']);
				}
			});
		} else {
			this.categoryService.updateOneFieldCategory(this.categoryId, newCategoryName).subscribe(
				(res) => {
					if(res['status'] == 1){
						this.snackBarService.showSuccessMessage(res['message']);
					}
					else {
						this.snackBarService.showErrorMessage(res['message'])
					}
				}
			);
		}
	}	
	
}
