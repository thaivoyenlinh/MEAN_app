import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { tap } from "rxjs/operators";

import { OrderService } from "../../services/order/order.service";
import { ToastService } from "../../services/toast/toast.service";
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
    private toastService: ToastService,
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
            this.orderData = new MatTableDataSource(data);
            this.orderData.paginator = this.orderPaginator;
          },
          (error) => {
            if (error.error.title === "ERROR") {
              this.toastService.showErrorMessage(error.error["message"]);
            }
            this.loadingService.hide();
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
        tap(
          (data) => {
            this.init();
            this.toastService.showSuccessMessage(data["message"]);
          },
          (error) => {
            this.toastService.showErrorMessage(error.error["message"]);
          }
        )
      )
      .subscribe();
  }

  openOrderDetailsDialog(row: string) {
    this.dialogService.openOrderDetailsDialog(row);
  }
}
