import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item } from '../../interfaces/item/item';
import { ItemService } from '../../services/item/item.service';
import { UserService } from '../../services/user/user.service';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

	itemId: string;
	item: Observable<Item>;
	UserInformationForm: FormGroup

	constructor(private route: ActivatedRoute,
				private itemService: ItemService,
				private userService: UserService,
				) {
		route.queryParams.subscribe((params) => {
			this.itemId = params['Id'];
		});
	}

	ngOnInit() {
		console.log("ID:",this.itemId);
		this.item = this.itemService.getItemById(this.itemId);

		this.UserInformationForm = new FormGroup({
			name: new FormControl(''),
			phoneNumber: new FormControl(''),
			address: new FormControl('')
		})
	}

	onSubmit(){
		// console.log("info: ", this.UserInformationForm.value);
		const userFormValue = this.UserInformationForm.value;
		this.userService.storeUser(userFormValue).subscribe((res) => console.log(res));
	}

}
