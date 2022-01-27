import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, NavigationEnd, Router, Data } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../../interfaces/breadcrumb/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private readonly _breadcrumb$ = new BehaviorSubject<Breadcrumb[]>([]);

  readonly breadcrumb$ = this._breadcrumb$.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(event => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);

      this._breadcrumb$.next(breadcrumbs);
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]){
    if(route) {
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));
  
      if(route.data.breadcrumb) {
        const breadcrumb = {
          label: this.getLabel(route.data),
          url: '/' + routeUrl.join('/')
        };
        breadcrumbs.push(breadcrumb);
      }

      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }

  private getLabel(data: Data){
    return typeof data.breadcrumb === 'function' ? data.breadcrumb(data) : data.breadcrumb;
  }
}
