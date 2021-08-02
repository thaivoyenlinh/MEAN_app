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

	/**
	 * Function to get list of items from database
	 * @returns an Observable of response
	 */
	getListOfItems() : Observable<Item[]>{
		return this.http.get<any>(this.SERVER_URL);
	}

	/**
	 * Function to delete a item by its item id
	 * @param itemId 
	 * @returns an Observable of response
	 */
	deleteItem(itemId: string) : Observable<void>{
		return this.http.delete<void>(`${this.SERVER_URL}/${itemId}?_method=DELETE`);
	}

	/**
	 * Function to fetch item by its item id
	 * @param itemId : item id
	 * @returns an Observable of response
	 */
	getItem(itemId: string) : Observable<Item>{
		return this.http.get<Item>(`${this.SERVER_URL}/${itemId}`);
	}

	/**
	 * Function to update item by its item id
	 * @param itemId : item id
	 * @param newItem : new item data after modify
	 * @returns an Observable of response
	 */
	updateItem(itemId: string, newItem: Item) : Observable<void> {
		return this.http.put<void>(`${this.SERVER_URL}/${itemId}?_method=PUT`, newItem);
	}

}
