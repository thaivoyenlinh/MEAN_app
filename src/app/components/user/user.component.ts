import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { tap } from "rxjs/operators";

import { UserService } from "../../services/user/user.service";
import { LoadingScreenService } from "../../services/loading-screen/loading-screen.service";
import { ToastService } from "../../services/toast/toast.service";
import { DialogService } from "../../services/dialog/dialog.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = [
    "user_id",
    "user_name",
    "user_phone_number",
    "user_address",
    "action",
  ];
  userData = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) userPaginator: MatPaginator;

  constructor(
    private userService: UserService,
    private loadingService: LoadingScreenService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.loadingService.show();
    this.userService
      .getListOfUsers()
      .pipe(
        tap(
          (data) => {
            this.userData = new MatTableDataSource(data);
            this.userData.paginator = this.userPaginator;
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

  onDelete(userId: string) {
    this.dialogService
      .openConfirmDialog("user")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.deleteOrder(userId);
        }
      });
  }

  deleteOrder(userId: string) {
    this.userService
      .deleteUser(userId)
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
}
