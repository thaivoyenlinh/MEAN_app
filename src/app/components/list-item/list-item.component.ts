import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
			  	private itemService: ItemService){

		route.queryParams.subscribe((params) => {
			this.categoryName = params['name'];
		})
   	}

	ngOnInit() {
		this.listItem$ = this.itemService.getItemsByCategory(this.categoryName);
		// .subscribe(
		//   (res) => {
		// 		const item = res['data'];
		// 		console.log(item);
		//   })
	}

}
