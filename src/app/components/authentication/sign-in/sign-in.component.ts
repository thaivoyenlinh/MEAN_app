import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../../services/user/user.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
})
export class SignInComponent implements OnInit {
  SignInForm: FormGroup;
  hide = true;
  constructor(protected router: Router, private userService: UserService) {}

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl("/userprofile");
    } else {
      this.SignInForm = new FormGroup({
        username: new FormControl(""),
        password: new FormControl(""),
      });
    }
  }

  onSubmit() {
    if (this.SignInForm.invalid) {
      return;
    } else {
      this.userService.login(this.SignInForm.value).subscribe(
        (res) => {
          console.log("res login: ", res);
          this.userService.setToken(res["token"]);
          this.router.navigateByUrl("/userprofile");
        },
        (err) => {
          console.log(err.error);
        }
      );
    }
  }
}
