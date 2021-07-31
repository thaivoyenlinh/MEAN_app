import { Injectable } from '@angular/core';
//* Observable save data is sent from server
//* it is midleware to communicate between server and client
import { Observable } from 'rxjs';
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
	 * Function to send a category to server (justn send)
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
		//* use HTTP Client service is provided by Angular
		//* response from server is array categories
		//* so data type of Observable emit is array category (Category[])
		return this.http.get<any>(this.SERVER_URL);
	} 

}
