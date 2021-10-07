import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../services/item/item.service';
import { Item } from '../../interfaces/item/item';
import { Observable } from 'rxjs';

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
				protected router: Router) { 
		route.queryParams.subscribe((params) => {
			this.itemId = params['Id'];
		})
	}

	ngOnInit() {
		this.item = this.itemService.getItemById(this.itemId);
		// .subscribe((res) => console.log("RES" ,res));
	}

}
