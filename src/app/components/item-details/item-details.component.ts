import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../../interfaces/item/item';
import { ItemService } from '../../services/item/item.service';
import { map, tap } from 'rxjs/operators';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';

@Component({
	selector: 'app-item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

	itemId: string;
	itemDetails$: Observable<Item>;
	items: GalleryItem[];
	

	constructor(private route: ActivatedRoute,
				private itemService: ItemService,
				protected router: Router) {

		route.queryParams.subscribe(params => {
			this.itemId = params['Id'];
			// console.log(this.itemId);
		})
	}

	ngOnInit() {
		this.itemDetails$ = this.itemService.getItemById(this.itemId);
		// .pipe(
			// tap((res) => {
			// 	this.items = res.item_image.map(item => new ImageItem({src: item, thumb: item}))
			// 	// .map(item => new ImageItem({src: item, thumb: item}));
			// 	// console.log(res.item_image);
			// 	// .map(item => new ImageItem({src: item.item_image}))

			// })
		// );
	}

}
