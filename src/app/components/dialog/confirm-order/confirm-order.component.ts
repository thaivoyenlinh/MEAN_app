import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

import { Order } from "../../../interfaces/order/order";
import { Item } from "../../../interfaces/item/item";
import { User } from "../../../interfaces/user/user";
import { ItemService } from "../../../services/item/item.service";
import { UserService } from "../../../services/user/user.service";
import { OrderService } from "../../../services/order/order.service";
import { DialogService } from "../../../services/dialog/dialog.service";
import { LoadingScreenService } from "../../../services/loading-screen/loading-screen.service";

@Component({
  selector: "app-confirm-order",
  templateUrl: "./confirm-order.component.html",
  styleUrls: ["./confirm-order.component.scss"],
})
export class ConfirmOrderComponent implements OnInit {
  orderData: Order;
  item: Item;
  user: User;

  constructor(
    public dialogRef: MatDialogRef<ConfirmOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    protected router: Router,
    private itemService: ItemService,
    private userService: UserService,
    private orderService: OrderService,
    private dialogService: DialogService,
    private loadingService: LoadingScreenService
  ) {}

  ngOnInit() {
    this.orderData = this.data;
    console.log("Confirm Order Dialog: ", this.orderData);
    this.userService
      .getUserById(this.orderData.user_id)
      .pipe(
        tap((res) => {
          this.user = res;
          console.log("user by id: ", this.user);
        })
      )
      .subscribe();
    this.orderData.item_id.forEach((itemID) => {
      this.itemService
        .getItemById(itemID)
        .pipe(
          tap((res) => {
            this.item = res;
            console.log("item: ", this.item);
          })
        )
        .subscribe();
    });
  }

  onDelete() {
    this.dialogService
      .openConfirmDialog("order")
      .afterClosed()
      .subscribe((res) => {
        if (res == "true") {
          this.deleteOrder();
        }
      });
  }

  deleteOrder() {
    this.orderService.deleteOrder(this.orderData._id).subscribe();
    this.userService.deleteUser(this.orderData.user_id).subscribe();
    this.dialogRef.close(false);
    this.router.navigateByUrl("/");
  }

  closeDialog() {
    this.dialogRef.close(false);
    this.router.navigateByUrl("/");
  }
}
