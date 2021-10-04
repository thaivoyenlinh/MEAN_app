import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from '../../services/item/item.service';
import { Item } from '../../interfaces/item/item';

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {


  	categoryName: string;
	listItem$: Observable<Item[]>

  	constructor(private route: ActivatedRoute,
			  	private itemService: ItemService,
				protected router: Router){

		route.queryParams.subscribe((params) => {
			this.categoryName = params['name'];
		})
   	}

	ngOnInit() {
		this.listItem$ = this.itemService.getItemsByCategory(this.categoryName);
	}

	selectItem(itemId: string){
		// console.log(itemId);
		let navigationExtras: NavigationExtras = {
			queryParams: { Id: itemId},
		};
		this.router.navigate(['/itemdetails'], navigationExtras);
	}

}
