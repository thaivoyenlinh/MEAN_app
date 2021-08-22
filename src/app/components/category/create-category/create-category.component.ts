import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

//* import Category service to perform the communication bewteen Client and Server
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../interfaces/category/category';

@Component({
	selector: 'app-create-category',
	templateUrl: './create-category.component.html',
	styleUrls: ['./create-category.component.scss']
})

export class CreateCategoryComponent implements OnInit {

  	CreateCategoryForm: FormGroup
	category: Category
	imageData: string

  	constructor(protected router: Router, 
             	private categoryService: CategoryService) { 
  	}

	ngOnInit() {
		this.CreateCategoryForm = new FormGroup ({
			category_name: new FormControl(''),
			category_image: new FormControl(''),
		});
	}

	onFileSelectd(event: Event){
		const file = (event.target as HTMLInputElement).files[0];
		this.CreateCategoryForm.patchValue({ category_image: file });
		const allowTypeImage = ['category_image/png', 'category_image/jpeg', 'category_image/jpg'];
		if(file && allowTypeImage.includes(file.type)){
			const reader = new FileReader();
			reader.onload = () => {
				this.imageData = reader.result as string;
			}
			reader.readAsDataURL(file);
		}
	}

	onSubmit() {
		

		const category = this.CreateCategoryForm.value;
		this.categoryService.storeCategory(category).subscribe(
			(res) => {
				if(res['status'] == 1){
					this.router.navigateByUrl('/admin/category');
				}
				else{
					console.log("Response from server: ", res['message']);
				}
			}
		)
	}  

}
