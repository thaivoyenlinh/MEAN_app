import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

//* import Category service to perform the communication bewteen Client and Server
import { CategoryService } from '../../../services/category/category.service';

@Component({
	selector: 'app-create-category',
	templateUrl: './create-category.component.html',
	styleUrls: ['./create-category.component.scss']
})

export class CreateCategoryComponent implements OnInit {

  	CreateCategoryForm: FormGroup

  	constructor(protected router: Router, 
             	private categoryService: CategoryService) { 
  	}

	ngOnInit() {
		this.CreateCategoryForm = new FormGroup ({
			category_name: new FormControl(''),
			category_avatar: new FormControl(''),
		});
	}

	onSubmit() {
		// console.log(this.CreateCategoryForm.value);
		
		//! send the data is submited to server so call storeCategory in here
		const category = this.CreateCategoryForm.value;
		//* categoryService return Observable => subcribe()
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
