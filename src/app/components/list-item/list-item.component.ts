import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from '../../services/item/item.service';
import { Item } from '../../interfaces/item/item';
import { map, tap } from 'rxjs/operators';

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {


  	categoryName: string;
	listItem$: Observable<Item[]>;
	seachText: string;

  	constructor(private route: ActivatedRoute,
			  	private itemService: ItemService,
				protected router: Router){

		route.queryParams.subscribe((params) => {
			this.categoryName = params['name'];
		})

		route.queryParams.subscribe((paramSearch) => {
			this.seachText = paramSearch['searchText'];
		})
   	}

	ngOnInit() {
		this.init();
	}

	init(){
		console.log("params search text: ",this.seachText);
		console.log("params categoryName: ", this.categoryName)
		if(this.categoryName != null){
			this.listItem$ = this.itemService.getItemsByCategory(this.categoryName);
		}
		if(this.seachText != null){
			this.listItem$ = this.itemService.getItemsBySearch(this.seachText).pipe(
				tap(res => {console.log(res)}),
				map((res) => res['data']),
				tap(res => {console.log("after: ",res)}),
			);
		}
	}

	selectItem(itemId: string){
		console.log(itemId);
		let navigationExtras: NavigationExtras = {
			queryParams: { Id: itemId},
		};
		this.router.navigate(['/itemdetails'], navigationExtras);
	}

}
