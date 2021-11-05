import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../interfaces/order/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  SERVER_URL = 'http://localhost:4100'

  constructor(private http: HttpClient) { }

  storeOrder(userId, itemId, totalPrice) : Observable<void>{
    return this.http.post<void>(`${this.SERVER_URL}/order`, {userId, itemId, totalPrice});
  }
}
