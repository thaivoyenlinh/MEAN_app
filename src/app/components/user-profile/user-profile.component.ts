import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "../../interfaces/user/user";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  userDetails: any;
  constructor(protected router: Router, private userService: UserService) {}

  ngOnInit() {
    console.log("user profile");
    this.userService
      .getUserProfile()
      .pipe(
        tap((res) => {
          this.userDetails = res;
          console.log(this.userDetails);
        })
      )
      .subscribe();
  }

  SignOut() {
    this.userService.deleteToken();
    this.router.navigateByUrl("/");
  }
}
