import { Injectable } from '@angular/core';
//* Observable save data is sent from server
//* it is midleware to communicate between server and client
import { Observable } from 'rxjs';
//* map method to transform data
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

//* import Category interface to storeCategory function
import { Category } from '../../interfaces/category/category';

@Injectable({
  	providedIn: 'root'
})
export class CategoryService {
 
  //* Full path for category route on server
  	SERVER_URL = 'http://localhost:4100/categories' // base url

  	constructor(private http: HttpClient) { }

	//! Please hover on method and write instruction

	/**
	 * Function to send a category to server (just send)
	 * (save is handled on the server side, will write after this function)
	 * @param category : category data (e.g: data get from the category form)
	 * @returns an Observable of response
	 */
	storeCategory(category: Category) : Observable<void>{
		//* Want to send data to localhost:4100/categories/store
		//* String template ``
		return this.http.post<void>(`${this.SERVER_URL}/store`, category);
	}

	//*basic function: is used to show the communication between Client and Server
	/**
	 * Function to fetch list of categories from database
	 * @returns an Observable of response
	 */
	getListOfCategories () : Observable<Category[]> {
		// return this.http.get<any>(this.SERVER_URL);
		//* use side effect outside subcribe(), through pipe()
		//* directly return response just have data, and client side can not call res['data'] to get only data
		//! Transform data: map()
		return this.http.get<any>(this.SERVER_URL).pipe(
			map((res) => res['data'])
		);

	} 

	/**
	 * Function to dalete category by its category id
	 * @param categoryId : category id
	 * @returns an Observable of response
	 */
	deleteCategory(categoryId: string) : Observable<void> {
		//* use delete method
		return this.http.delete<void>(`${this.SERVER_URL}/${categoryId}?_method=DELETE`);
	}

	/**
	 * Function to get a category by its category id
	 * @param categoryId : category id
	 * @returns an Observable of response
	 */
	getCategory(categoryId: string) : Observable<Category> {
		//* use put or patch method to update data
		return this.http.get<Category>(`${this.SERVER_URL}/${categoryId}`) ;
	}

	/**
	 * Function to update a new category by its category id
	 * @param categoryId : category id
	 * @param newCategory : new category data
	 * @returns an Observable of response
	 */
	updateCategory(categoryId: string, newCategory: Category) : Observable<void> {
		return this.http.put<void>(`${this.SERVER_URL}/${categoryId}?_method=PUT`, newCategory);
	}
}
