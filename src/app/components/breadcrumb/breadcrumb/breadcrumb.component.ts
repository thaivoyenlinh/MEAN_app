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
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
      });
  }

  buildBreadcrumb(
    route: ActivatedRoute,
    url: string = "",
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const breadcrumb: Breadcrumb = {
      /// '...'spread operator
      // '!!' ckeck cover (null, '', undefind,...) khi ma minh khong Fxac dinh dc kieu dl
      ...(!!(
        route.routeConfig &&
        route.routeConfig.data &&
        route.routeConfig.path
      )
        ? {
            label: route.routeConfig.data.breadcrumb,
            url: `${url}/${route.routeConfig.path}`,
          }
        : {
            label: "",
            url: "",
          }),
    };

    const newBreadcrumbs = !!breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : breadcrumbs;

    return route.firstChild
      ? this.buildBreadcrumb(route.firstChild, breadcrumb.url, newBreadcrumbs)
      : newBreadcrumbs;
  }
}
