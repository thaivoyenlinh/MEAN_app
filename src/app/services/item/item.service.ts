import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Item } from "../../interfaces/item/item";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  SERVER_URL = "http://localhost:4100";

  constructor(private http: HttpClient) {}

  /**
   * Function to send a item to server (just send)
   * @param item : item data (e.g: data get from the item form)
   * @returns an Observable of response
   */
  storeItem(item: Item): Observable<void> {
    let formData = new FormData();
    Object.keys(item).forEach((key) => {
      key !== "item_image"
        ? formData.append(key, item[key])
        : item[key].forEach((image) => formData.append(key, image));
    });
    return this.http.post<void>(`${this.SERVER_URL}/item`, formData);
  }

  /**
   * Function to get list of items from database
   * @returns an Observable of response
   */

  getListOfItems(): Observable<Item[]> {
    return this.http
      .get<any>(`${this.SERVER_URL}/items`)
      .pipe(map((res) => res["data"]));
  }

  /**
   * Function to delete a item by its item id
   * @param itemId
   * @returns an Observable of response
   */
  deleteItem(itemId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.SERVER_URL}/item/${itemId}?_method=DELETE`
    );
  }

  getItemByName(itemName: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.SERVER_URL}/items/${itemName}`);
  }

  /**
   * Function to update item by its item id
   * @param itemId : item id
   * @param newItem : new item data after modify
   * @returns an Observable of response
   */
  updateItem(itemId: string, newItem: Item): Observable<void> {
    return this.http.put<void>(
      `${this.SERVER_URL}/item/${itemId}?_method=PUT`,
      newItem
    );
  }

  getItemsByCategory(categoryName: string): Observable<Item[]> {
    // console.log(categoryName);
    return this.http
      .get<Item[]>(`${this.SERVER_URL}/items/list/${categoryName}`)
      .pipe(
        tap((res) => console.log(res)),
        map((res) => res["data"])
      );
  }

  /**
   * Function to fetch item by its item id
   * @param itemId : item id
   * @returns an Observable of response
   */
  getItemById(itemId: string): Observable<Item> {
    return this.http
      .get<Item>(`${this.SERVER_URL}/item/${itemId}`)
      .pipe(map((res) => res["data"]));
  }

  getItemsBySearch(text: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.SERVER_URL}/items/${text}`);
  }

  getItemsBy(filter: string, filterValue: string): Observable<Item[]> {
    return this.http
      .post<Item[]>(`${this.SERVER_URL}/items`, { filter, filterValue })
      .pipe(map((res) => res["data"]));
  }
}
