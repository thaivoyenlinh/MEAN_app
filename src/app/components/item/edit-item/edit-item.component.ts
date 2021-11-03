import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Category } from '../../../interfaces/category/category';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ItemService } from '../../../services/item/item.service';
import { CategoryService } from '../../../services/category/category.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { LoadingScreenService } from '../../../services/loading-screen/loading-screen.service';

@Component({
	selector: 'app-edit-item',
	templateUrl: './edit-item.component.html',
	styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

	EditItemForm: FormGroup
	itemId: string
	listOfCategories$: Observable<Category[]>
	// isSubmit: boolean = false;

	config = {
		toolbar: [
			['bold', 'italic', 'underline'],
			[{ 'header': 1 }, { 'header': 2 }],
			[{ 'list': 'ordered'}, { 'list': 'bullet' }],
			[{ 'align': [] }],
			[{ 'size': ['small', false, 'large', 'huge'] }],  
			[{ 'font': [] }],
			['link', 'image']   
		]
	}

	constructor(protected router: Router, 
				private fb: FormBuilder, 
				private route: ActivatedRoute,
				private itemService: ItemService,
				private categoryService: CategoryService,
				private snackBarService: SnackbarService,
				private loadingService: LoadingScreenService) {
		
		this.EditItemForm = this.fb.group({
			item_name_replace: new FormControl('', [Validators.required, Validators.pattern("^[A-z0-9 ]{2,30}$")]),
			item_price_replace: new FormControl('', [Validators.required, Validators.pattern("^[0-9,.]{4,10}$")]),
			item_category_replace: new FormControl(''),
			item_type_replace: new FormControl('', Validators.required),
			item_discription_replace: new FormControl('', Validators.required),
		});

		this.route.queryParams.subscribe((params) => {
			this.itemId = params['id'];
		});

	}

	ngOnInit() {
		this.listOfCategories$ = this.categoryService.getListOfCategories();
		this.itemService.getItemById(this.itemId).subscribe(
			(res) => {
				const item = res;
				console.log("ITEM:",item.item_type);
				this.EditItemForm.setValue({
					item_name_replace: item.item_name,
					item_price_replace: item.item_price, 
					item_category_replace: item.item_category, 
					item_type_replace: item.item_type,
					item_discription_replace: item.item_discription, 
				});
			} 
		)	
	}

	onSubmit() {
		const item = this.EditItemForm.value;
		this.loadingService.show();
		this.itemService.updateItem(this.itemId, item).pipe(
			tap(
				(data) => {
					this.loadingService.hide();
					data['status'] == 1 ? this.snackBarService.showSuccessMessage(data['message']) :
					this.snackBarService.showErrorMessage(data['message']); 
				},
				(error)=>{
				},
				() => {
					this.router.navigateByUrl('/admin/item');
				}
			)
		).subscribe();
	}
}
