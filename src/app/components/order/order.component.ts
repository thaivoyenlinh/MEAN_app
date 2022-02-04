import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { tap } from "rxjs/operators";

import { OrderService } from "../../services/order/order.service";
import { SnackbarService } from "../../services/snackbar/snackbar.service";
import { LoadingScreenService } from "../../services/loading-screen/loading-screen.service";
import { DialogService } from "../../services/dialog/dialog.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = [
    "order_id",
    "user_id",
    "item_id",
    "quantity",
    "price",
    "action",
  ];

  orderData = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: false }) orderPaginator: MatPaginator;

  constructor(
    private orderService: OrderService,
    private snackBarService: SnackbarService,
    private loadingService: LoadingScreenService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.loadingService.show();
    this.orderService
      .getListOfOrders()
      .pipe(
        tap(
          (data) => {
            // console.log("Data:", data);
            this.orderData = new MatTableDataSource(data);
            this.orderData.paginator = this.orderPaginator;
          },
          (error) => {
            this.snackBarService.showErrorMessage(error.message);
          },
          () => {
            this.loadingService.hide();
          }
        )
      )
      .subscribe();
  }

  onDelete(orderId: string) {
    this.dialogService
      .openConfirmDialog("order")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.deleteOrder(orderId);
        }
      });
  }

  deleteOrder(orderId: string) {
    this.orderService
      .deleteOrder(orderId)
      .pipe(
        tap((res) => {
          res["status"] == 1
            ? (this.init(),
              this.snackBarService.showSuccessMessage(res["message"]))
            : this.snackBarService.showErrorMessage(res["message"]);
        })
      )
      .subscribe();
  }

  openOrderDetailsDialog(row: string) {
    this.dialogService.openOrderDetailsDialog(row);
  }
}
