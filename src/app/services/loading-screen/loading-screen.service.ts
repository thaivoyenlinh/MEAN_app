import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  show(){
    this.isLoading$.next(true);
  }

  hide(){
    this.isLoading$.next(false);
  }

  isVisible() : Observable<boolean>{
    return this.isLoading$.asObservable().pipe(share());
  }

}
