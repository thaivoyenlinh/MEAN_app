import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

//* import Category service to perform the communication bewteen Client and Server
import { CategoryService } from "../../../services/category/category.service";
import { Category } from "../../../interfaces/category/category";

import { ToastService } from "../../../services/toast/toast.service";
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
    private toastService: ToastService,
    private loadingService: LoadingScreenService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.CreateCategoryForm = new FormGroup({
      category_name: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z A-Z]{2,20}$"),
      ]),
      category_image: new FormControl(null, Validators.required),
    });
  }

  get name() {
    return this.CreateCategoryForm.get("category_name");
  }

  onChooseFile(event) {
    this.imageData = event.target.files[0];
  }

  onSubmit() {
    const categoryObj: Category = {
      category_name: this.CreateCategoryForm.value.category_name,
      category_image: this.imageData,
    };
    this.isSubmitted = true;
    this.loadingService.show();
    this.categoryService
      .storeCategory(categoryObj)
      .pipe(
        tap(
          (data) => {
            this.toastService.showSuccessMessage(data["message"]);
          },
          (error) => {
            this.toastService.showErrorMessage(error.error["message"]);
            this.loadingService.hide();
          },
          () => {
            this.loadingService.hide();
            this.init();
          }
        )
      )
      .subscribe();
  }
}
