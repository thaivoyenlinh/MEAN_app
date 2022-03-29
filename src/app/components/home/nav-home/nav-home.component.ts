import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs/operators";
import { LoadingScreenService } from "../../../services/loading-screen/loading-screen.service";
import { UserService } from "../../../services/user/user.service";

@Component({
  selector: "app-nav-home",
  templateUrl: "./nav-home.component.html",
  styleUrls: ["./nav-home.component.scss"],
})
export class NavHomeComponent implements OnInit {
  isLogged: Boolean;
  userProfile: any;
  constructor(
    public loadingScreenService: LoadingScreenService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.isLogged = this.userService.isLoggedIn();
    if (this.isLogged == true) {
      this.userService
        .getUserProfile()
        .pipe(
          tap((res) => {
            this.userProfile = res;
          })
        )
        .subscribe();
    }
  }

  // * use to reload page/component
  reloadPage(): void {
    window.location.reload();
  }
}
