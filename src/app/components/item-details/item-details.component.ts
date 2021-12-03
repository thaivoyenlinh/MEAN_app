import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../../interfaces/item/item';
import { ItemService } from '../../services/item/item.service';
import { map, tap } from 'rxjs/operators';
// import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
	selector: 'app-item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemDetailsComponent implements OnInit {

	itemId: string;
	itemDetails$: Observable<Item>;
	
	// items: GalleryItem[];

	galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
	

	constructor(private route: ActivatedRoute,
				private itemService: ItemService,
				protected router: Router) {
					// public gallery: Gallery

		route.queryParams.subscribe(params => {
			this.itemId = params['Id'];
			// console.log(this.itemId);
		})
	}

	ngOnInit() {
		this.itemDetails$ = this.itemService.getItemById(this.itemId)
		.pipe(
			tap((res) => {
				// console.log("BEFORE:",res.item_image)
				let imageData = [];
				res.item_image.forEach(image => {
					imageData.push({small: image, medium: image, big:image})
				})
				this.galleryImages = imageData;
				// console.log("gelleryImages", this.galleryImages);
			})	
		);

		this.galleryOptions = [
            {
                width: '400px',
                height: '450px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            {
                breakpoint: 800,
                width: '100px',
                height: '200px',
                imagePercent: 50,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            {
                breakpoint: 400,
                preview: false
            }
        ];
	}

	addToCart(itemId: string){
		// console.log("ID: ",itemId);
		let navigationExtras: NavigationExtras = {
			queryParams:{ Id: itemId} 
		};
		this.router.navigate(['/cart'], navigationExtras);
	}

	buyNow(itemId: string){
		let navigationExtras: NavigationExtras = {
			queryParams:{ Id: itemId} 
		};
		this.router.navigate(['/checkout'], navigationExtras);
	}

}


