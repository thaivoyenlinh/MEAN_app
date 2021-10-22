import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingScreenService } from './loading-screen.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public loadingScreenService: LoadingScreenService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingScreenService.isLoading.next(true);
    return next.handle(req).pipe(
      finalize(
        () => {
          this.loadingScreenService.isLoading.next(false);
        }
      )
    )
  }

}
