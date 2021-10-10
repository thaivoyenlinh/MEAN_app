import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ItemService } from '../../services/item/item.service';
import { Item } from '../../interfaces/item/item';
import { Observable } from 'rxjs';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	itemId: string;
	item: Observable<Item>;

	constructor(private route: ActivatedRoute,
				private itemService: ItemService,
				protected router: Router,
				private dialogService: DialogService,
				) { 
		route.queryParams.subscribe((params) => {
			this.itemId = params['Id'];
		})
	}

	ngOnInit() {
		this.item = this.itemService.getItemById(this.itemId);
		// .subscribe((res) => console.log("RES" ,res));
	}

	clickCheckout(itemId){
		let navigationExtras: NavigationExtras = {
			queryParams: {Id: itemId}
		};
		this.router.navigate(['/checkout'], navigationExtras);
	}

}
