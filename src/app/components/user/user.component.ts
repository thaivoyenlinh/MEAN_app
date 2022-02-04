import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { tap } from "rxjs/operators";

import { UserService } from "../../services/user/user.service";
import { LoadingScreenService } from "../../services/loading-screen/loading-screen.service";
import { SnackbarService } from "../../services/snackbar/snackbar.service";
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
    private snackBarService: SnackbarService,
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
            this.snackBarService.showErrorMessage(error.message);
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
      .openConfirmDialog("order")
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
        tap((res) => {
          res["status"] == 1
            ? (this.init(),
              this.snackBarService.showSuccessMessage(res["message"]))
            : this.snackBarService.showErrorMessage(res["message"]);
        })
      )
      .subscribe();
  }
}
