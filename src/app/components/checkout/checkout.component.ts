import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { tap, switchMap, map } from "rxjs/operators";

import { Item } from "../../interfaces/item/item";
import { User } from "../../interfaces/user/user";
import { ItemService } from "../../services/item/item.service";
import { UserService } from "../../services/user/user.service";
import { LoadingScreenService } from "../../services/loading-screen/loading-screen.service";
import { SnackbarService } from "../../services/snackbar/snackbar.service";
import { OrderService } from "../../services/order/order.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  itemId: string;
  userId: string;
  item: Observable<Item>;
  totalPrice: string;
  UserInformationForm: FormGroup;
  userData: string;
  orderBtnDisable: boolean = true;
  saveBtnDisable: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private userService: UserService,
    private loadingSreenService: LoadingScreenService,
    private snackBarService: SnackbarService,
    private orderService: OrderService
  ) {
    route.queryParams.subscribe((params) => {
      this.itemId = params["Id"];
    });
  }

  ngOnInit() {
    console.log("item ID:", this.itemId);
    this.item = this.itemService.getItemById(this.itemId).pipe(
      tap((res) => {
        this.totalPrice = res.item_price;
      })
    );
    this.initForm();
  }

  initForm() {
    this.UserInformationForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-z A-Z]{2,30}$"),
      ]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[0-9]{10,11}$"),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-z A-Z 0-9,/]{10,100}$"),
      ]),
    });
  }

  get name() {
    return this.UserInformationForm.get("name");
  }

  get phoneNumber() {
    return this.UserInformationForm.get("phoneNumber");
  }

  onSubmit() {
    // console.log("info: ", this.UserInformationForm.value);
    this.loadingSreenService.show();
    const userFormValue = this.UserInformationForm.value;
    this.userService
      .storeUser(userFormValue)
      .pipe(
        tap(
          (res) => {
            this.snackBarService.showSuccessMessage(res["message"]);
            this.saveBtnDisable = true;
          },
          (error) => {
            this.snackBarService.showErrorMessage(error.message);
          }
        ),
        switchMap(() => this.userService.getLatestUser()),
        tap(
          (res) => {
            console.log("RES: ", res);
            this.userId = res._id;
            console.log("User Id: ", this.userId);
            this.orderBtnDisable = false;
          },
          (error) => {
            this.snackBarService.showErrorMessage(error.message);
          },
          () => {
            this.loadingSreenService.hide();
          }
        )
      )
      .subscribe();
  }

  onOrder() {
    this.orderService
      .storeOrder(this.userId, this.itemId, this.totalPrice)
      .subscribe();
  }
}
