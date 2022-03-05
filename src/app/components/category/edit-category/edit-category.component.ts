import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { tap } from "rxjs/operators";

import { CategoryService } from "../../../services/category/category.service";
import { ToastService } from "../../../services/toast/toast.service";
import { LoadingScreenService } from "../../../services/loading-screen/loading-screen.service";

@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.scss"],
})
export class EditCategoryComponent implements OnInit {
  EditCategoryForm: FormGroup;

  //? declare in both send and receive component
  categoryId: string;
  imageData: File = null;

  //* Router to catch the data form Category Component
  constructor(
    protected router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toastService: ToastService,
    private loadingService: LoadingScreenService
  ) {
    this.EditCategoryForm = this.fb.group({
      category_name_replace: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z A-Z]{2,20}$"),
      ]),
      // category_image_replace: new FormControl(null, Validators.required),
    });

    //! catch the data
    this.route.queryParams.subscribe((params) => {
      this.categoryId = params["id"];
    });
  }

  onChooseFile(event) {
    // console.log("EVENT:", event.target.files[0].name);
    this.imageData = event.target.files[0];
  }

  ngOnInit() {
    this.categoryService.getCategory(this.categoryId).subscribe((res) => {
      const category = res["data"];
      this.EditCategoryForm.setValue({
        category_name_replace: category.category_name,
      });
    });
  }

  get name() {
    return this.EditCategoryForm.get("category_name_replace");
  }

  onSubmit() {
    //! submit form and update new data
    const newCategoryName = this.EditCategoryForm.value.category_name_replace;
    this.loadingService.show();
    if (this.imageData !== null) {
      this.categoryService
        .updateAllFieldCategory(
          this.categoryId,
          newCategoryName,
          this.imageData
        )
        .pipe(
          tap(
            (data) => {
              this.loadingService.hide();
              data["status"] == 1
                ? this.toastService.showSuccessMessage(data["message"])
                : this.toastService.showErrorMessage(data["message"]);
            },
            (error) => {},
            () => {
              this.router.navigateByUrl("/admin/category");
            }
          )
        )
        .subscribe();
    } else {
      this.categoryService
        .updateOneFieldCategory(this.categoryId, newCategoryName)
        .pipe(
          tap(
            (data) => {
              this.loadingService.hide();
              data["status"] == 1
                ? this.toastService.showSuccessMessage(data["message"])
                : this.toastService.showErrorMessage(data["message"]);
            },
            (error) => {},
            () => {
              this.router.navigateByUrl("/admin/category");
            }
          )
        )
        .subscribe();
    }
  }
}
