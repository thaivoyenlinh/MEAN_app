import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../interfaces/order/order';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  SERVER_URL = 'http://localhost:4100'

  constructor(private http: HttpClient) { }

  storeOrder(userId, itemId, totalPrice) : Observable<void>{
    return this.http.post<void>(`${this.SERVER_URL}/order`, {userId, itemId, totalPrice});
  }

  getLatestOrder(): Observable<Order>{
    console.log("get latest order service");
    return this.http.get<Order>(`${this.SERVER_URL}/order`).pipe(
      map((res) => res['data']),
    );
  }

  deleteOrder(orderId) : Observable<void>{
    return this.http.delete<void>(`${this.SERVER_URL}/order/${orderId}?_method=DELETE`);
  }

}
