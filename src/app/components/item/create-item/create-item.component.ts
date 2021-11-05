import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Category } from "../../../interfaces/category/category";
import { ItemService } from "../../../services/item/item.service";
import { CategoryService } from "../../../services/category/category.service";
import { SnackbarService } from "../../../services/snackbar/snackbar.service";
import { LoadingScreenService } from "../../../services/loading-screen/loading-screen.service";

@Component({
  selector: "app-create-item",
  templateUrl: "./create-item.component.html",
  styleUrls: ["./create-item.component.scss"],
})
export class CreateItemComponent implements OnInit {
  CreateItemForm: FormGroup;
  listOfCategories$: Observable<Category[]>;
  imageData: File[];

  config = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["link", "image"],
    ],
  };

  constructor(
    protected router: Router,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private snackBarService: SnackbarService,
    private loadingSevice: LoadingScreenService
  ) {}

  ngOnInit() {
    this.listOfCategories$ = this.categoryService.getListOfCategories();
    this.CreateItemForm = new FormGroup({
      item_name: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-z0-9 ]{2,30}$"),
      ]),
      item_price: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9,.]{4,10}$"),
      ]),
      item_category: new FormControl("", Validators.required),
      item_type: new FormControl("", Validators.required),
      item_discription: new FormControl("", Validators.required),
      item_image: new FormControl("", Validators.required),
    });
  }

  onUploadFiles(event) {
    const files = event.target.files;
    this.imageData = files;
  }

  onSubmit() {
    this.loadingSevice.show();
    this.itemService
      .storeItem(this.CreateItemForm.value, this.imageData)
      .pipe(
        tap(
          (data) => {
            data["status"] == 1
              ? this.snackBarService.showSuccessMessage(data["message"])
              : this.snackBarService.showErrorMessage(data["message"]);
          },
          (error) => {},
          () => {
            this.loadingSevice.hide();
            this.CreateItemForm.reset();
          }
        )
      )
      .subscribe();
  }
}
