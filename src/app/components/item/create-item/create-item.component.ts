import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Category } from "../../../interfaces/category/category";
import { Item } from "../../../interfaces/item/item";
import { ItemService } from "../../../services/item/item.service";
import { CategoryService } from "../../../services/category/category.service";
import { ToastService } from "../../../services/toast/toast.service";
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
    private toastService: ToastService,
    private loadingService: LoadingScreenService
  ) {}

  ngOnInit() {
    this.listOfCategories$ = this.categoryService.getListOfCategories();
    this.CreateItemForm = new FormGroup({
      item_name: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-z0-9 ]{2,50}$"),
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
    this.imageData = event.target.files;
  }

  onSubmit() {
    this.loadingService.show();
    const itemObj: Item = {
      ...this.CreateItemForm.value,
      item_image: [...this.imageData]
    };
    this.itemService
      .storeItem(itemObj)
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
            this.CreateItemForm.reset();
          }
        )
      )
      .subscribe();
  }
}
