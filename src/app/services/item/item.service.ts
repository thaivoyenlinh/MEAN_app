import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

import { Item } from '../../interfaces/item/item';

@Injectable({
  	providedIn: 'root'
})
export class ItemService {

	SERVER_URL = 'http://localhost:4100/items'

	constructor( private http: HttpClient) { }

	/**
	 * Function to send a item to server (just send)
	 * @param item : item data (e.g: data get from the item form)
	 * @returns an Observable of response
	 */
	storeItem(item: Item) : Observable<void>{
		return this.http.post<void>(`${this.SERVER_URL}/store`, item);
	}

	getListOfItems() : Observable<Item[]>{
		return this.http.get<any>(this.SERVER_URL);
	}


}
