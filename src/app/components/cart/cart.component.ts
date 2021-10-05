import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	itemId: string;

	constructor(private route: ActivatedRoute) { 
		route.queryParams.subscribe((params) => {
			this.itemId = params['Id'];
		})
	}

	ngOnInit() {
		// console.log(this.itemId);
	}

}
