import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { distinctUntilChanged, filter } from "rxjs/operators";
import { Breadcrumb } from "../../../interfaces/breadcrumb/breadcrumb";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged(),
    ).subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
    })
  }

  buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data.breadcrumb
        : "";
    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : "";
    
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: Breadcrumb = {
      label: label,
      url: nextUrl
    };

    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    if (route.firstChild) {
      //If we are not on our current path yet,
      //there will be more children to look after, to build our breadcumb
      return this.buildBreadcrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;

  
  }

}
