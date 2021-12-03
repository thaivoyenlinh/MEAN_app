import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Order } from "../../../interfaces/order/order";
import { User } from "../../../interfaces/user/user";
import { Item } from "../../../interfaces/item/item";
import { UserService } from "../../../services/user/user.service";
import { ItemService } from "../../../services/item/item.service";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: Order;
  userDetails: User;
  itemDetails: Item;
  userId: string;
  constructor(
    public dialogRef: MatDialogRef<OrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private userService: UserService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.orderDetails = this.data;
    // console.log(this.orderDetails);
    this.userService
      .getUserById(this.orderDetails.user_id)
      .pipe(
        tap((res) => {
          this.userDetails = res;
        })
      )
      .subscribe();

    this.orderDetails.item_id.forEach((itemID) => {
      this.itemService
        .getItemById(itemID)
        .pipe(
          tap((res) => {
            this.itemDetails = res;
          })
        )
        .subscribe();
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
