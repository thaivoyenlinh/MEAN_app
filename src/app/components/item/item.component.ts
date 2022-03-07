import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NavigationExtras } from "@angular/router";
import { combineLatest, Observable, of, BehaviorSubject } from "rxjs";
import {
  tap,
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  delay,
} from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from "@angular/material";

import { Item } from "../../interfaces/item/item";
import { Category } from "../../interfaces/category/category";
import { ItemService } from "src/app/services/item/item.service";
import { CategoryService } from "../../services/category/category.service";
import { DialogService } from "../../services/dialog/dialog.service";
import { ToastService } from "../../services/toast/toast.service";
import { LoadingScreenService } from "../../services/loading-screen/loading-screen.service";

interface FilterCritiria {
  category?: string;
  priceRange?: object;
}

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
})
export class ItemComponent implements OnInit {
  displayedColumns: string[] = [
    "item_name",
    "item_price",
    "item_category",
    "item_type",
    "action",
  ];
  searchText: FormControl = new FormControl("");
  category: FormControl = new FormControl("");

  listOfCategories$: Observable<Category[]>;
  item$: Observable<Item[]>;
  search$: Observable<Item[]>;
  filterSubject: BehaviorSubject<FilterCritiria> =
    new BehaviorSubject<FilterCritiria>({});

  itemData = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) itemPaginator: MatPaginator;

  constructor(
    protected router: Router,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private loadingScreenService: LoadingScreenService
  ) {}

  ngOnInit() {
    this.init();
  }

  onDelete(itemId: string) {
    this.dialogService
      .openConfirmDialog("item")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.deleteItem(itemId);
        }
      });
  }

  deleteItem(itemId: string) {
    this.itemService
      .deleteItem(itemId)
      .pipe(
        tap(
          (data) => {
            this.init();
            this.toastService.showSuccessMessage(data["message"]);
          },
          (error) => {
            this.toastService.showErrorMessage(error.error["message"]);
          }
        )
      )
      .subscribe();
  }

  init() {
    this.listOfCategories$ = this.categoryService.getListOfCategories();
    this.search$ = this.searchText.valueChanges.pipe(
      startWith(""),
      tap((data) => {
        console.log("Datasearch: ", data);
      }),
      // debounceTime(100),
      distinctUntilChanged(),
      switchMap((data) =>
        data ? this.itemService.getItemsBySearch(data) : of(null)
      ),
      map((res) => res && res["data"]),
      tap((data) => console.log(data))
    );
    combineLatest([
      this.itemService.getListOfItems(),
      this.search$,
      this.filterSubject,
    ])
      .pipe(
        map(([items, searchResult, { category, priceRange }]) => {
          const sourceData = searchResult ? searchResult : items;
          if (sourceData.length !== 0) {
            this.loadingScreenService.show();
            return sourceData.filter((item) => {
              return category ? category === item.item_category : true;
            });
          } else {
            return sourceData;
          }
        }),
        delay(500),
        tap(
          (data) => {
            this.itemData = new MatTableDataSource(data);
            this.itemData.paginator = this.itemPaginator;
            this.loadingScreenService.hide();
          },
          (error) => {
            if (error.error.title === "ERROR") {
              this.toastService.showErrorMessage(error.error["message"]);
            }
            this.loadingScreenService.hide();
          }
        )
      )
      .subscribe();
  }

  reset() {
    this.filterSubject.next({});
    this.searchText = new FormControl("");
    this.category = new FormControl("");
    this.init();
  }

  selectFilter(filterValue: string) {
    let currentObj = this.filterSubject.getValue();
    console.log("curObj: ", currentObj);
    this.filterSubject.next({
      ...currentObj,
      category: filterValue,
    });
  }

  editItem(itemId: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: { id: itemId },
    };
    this.router.navigate(["/admin/item/edit"], navigationExtras);
  }

  openItemDetailsDialog(row) {
    this.dialogService.openItemDetailsDialog(row);
  }
}
