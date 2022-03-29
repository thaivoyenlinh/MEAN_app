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
import { ToastService } from "../../services/toast/toast.service";
import { OrderService } from "../../services/order/order.service";
import { DialogService } from "../../services/dialog/dialog.service";

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
    private toastService: ToastService,
    private orderService: OrderService,
    private dialogService: DialogService
  ) {
    route.queryParams.subscribe((params) => {
      this.itemId = params["Id"];
    });
  }

  ngOnInit() {
    // console.log("item ID:", this.itemId);
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
    // this.loadingSreenService.show();
    // const userFormValue = this.UserInformationForm.value;
    // this.userService
    //   .storeUser(userFormValue)
    //   .pipe(
    //     tap(
    //       (res) => {
    //         this.toastService.showSuccessMessage(res["message"]);
    //         this.saveBtnDisable = true;
    //       },
    //       (error) => {
    //         this.toastService.showErrorMessage(error.error["message"]);
    //       }
    //     ),
    //     switchMap(() => this.userService.getLatestUser()),
    //     tap(
    //       (res) => {
    //         this.userId = res._id;
    //         this.orderBtnDisable = false;
    //       },
    //       (error) => {
    //         this.toastService.showErrorMessage(error.error["message"]);
    //         this.loadingSreenService.hide();
    //       },
    //       () => {
    //         this.loadingSreenService.hide();
    //       }
    //     )
    //   )
    //   .subscribe();
  }

  onOrder() {
    // this.orderService
    //   .storeOrder(this.userId, this.itemId, this.totalPrice)
    //   .pipe(
    //     switchMap(() => this.orderService.getLatestOrder()),
    //     tap((res) => {
    //       this.dialogService.openConfirmOrderDialog(res).afterClosed();
    //     })
    //   )
    //   .subscribe();
  }
}
