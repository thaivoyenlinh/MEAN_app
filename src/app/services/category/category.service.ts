import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/category/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  SERVER_URL = 'http://localhost:4100/categories' // base url

  constructor(private http: HttpClient) { }

  getListOfCategories () : Observable<any> {
    
    return this.http.get(this.SERVER_URL);

  } 

}
