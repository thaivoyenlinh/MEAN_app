import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

//* import Category service to perform the communication bewteen Client and Server
import { CategoryService } from "../../../services/category/category.service";
import { Category } from "../../../interfaces/category/category";

import { SnackbarService } from "../../../services/snackbar/snackbar.service";
import { LoadingScreenService } from "../../../services/loading-screen/loading-screen.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-create-category",
  templateUrl: "./create-category.component.html",
  styleUrls: ["./create-category.component.scss"],
})
export class CreateCategoryComponent implements OnInit {
  CreateCategoryForm: FormGroup;
  category: Category;
  imageData: File;
  isSubmitted: boolean = false;

  constructor(
    protected router: Router,
    private categoryService: CategoryService,
    private snackBarService: SnackbarService,
    private loadingService: LoadingScreenService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.CreateCategoryForm = new FormGroup({
      category_name: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z A-Z]{2,16}$"),
      ]),
      // set category_image to clear form after submit
      category_image: new FormControl(null, Validators.required),
    });
  }

  get name() {
    return this.CreateCategoryForm.get("category_name");
  }

  onChooseFile(event) {
    // console.log("event:", event.target.files[0]);
    this.imageData = event.target.files[0];
  }

  onSubmit() {
    const categoryName = this.CreateCategoryForm.value.category_name;
    this.isSubmitted = true;
    this.loadingService.show();
    this.categoryService
      .storeCategory(categoryName, this.imageData)
      .pipe(
        tap(
          (data) => {
            data["status"] == 1
              ? this.snackBarService.showSuccessMessage(data["message"])
              : this.snackBarService.showErrorMessage(data["message"]);
          },
          (error) => {},
          () => {
            this.loadingService.hide();
            this.init();
          }
        )
      )
      .subscribe();
  }
}
