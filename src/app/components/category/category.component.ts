import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";

//! Interface tương tự cấu trúc tư định nghĩa. Import từ file interfaces/category (file định nghĩa)
import { Category } from "../../interfaces/category/category";

//! send data without showing in URL
import { NavigationExtras } from "@angular/router";

//! call service from server
import { CategoryService } from "../../services/category/category.service";
import { DialogService } from "../../services/dialog/dialog.service";
import { ToastService } from "../../services/toast/toast.service";
import { LoadingScreenService } from "../../services/loading-screen/loading-screen.service";

import { MatPaginator, MatTableDataSource } from "@angular/material";
import { ViewChild } from "@angular/core";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ["category_name", "category_image", "action"];
  categoryData = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: false }) categoryPaginator: MatPaginator;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private loadingScreenService: LoadingScreenService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.loadingScreenService.show();
    this.categoryService
      .getListOfCategories()
      .pipe(
        tap(
          (data) => {
            this.categoryData = new MatTableDataSource(data);
            this.categoryData.paginator = this.categoryPaginator;
          },
          (error) => {
            if (error.error.title === "ERROR") {
              //eleminated ERROR404 notFoundResponse() case
              this.toastService.showErrorMessage(error.error["message"]);
            }
            this.loadingScreenService.hide();
          },
          () => {
            this.loadingScreenService.hide();
          }
        )
      )
      .subscribe();
  }

  onDelete(categoryId: string) {
    this.dialogService
      .openConfirmDialog("category")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.deleteCategory(categoryId);
        }
      });
  }

  deleteCategory(categoryId: string) {
    this.categoryService
      .deleteCategory(categoryId)
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

  editCategory(categoryId: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: { id: categoryId },
    };
    this.router.navigate(["/admin/category/edit"], navigationExtras);
  }
}
