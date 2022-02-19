import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../../services/user/user.service";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  AccountRegistrationForm: FormGroup;
  // genders: ['male', 'female'];
  hide = true;
  hide_passconfirm = true;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.AccountRegistrationForm = this.fb.group(
      {
        username: new FormControl("", [Validators.required]),
        phoneNumber: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
        passwordConfirm: new FormControl(""),
      },
      {
        validator: this.MustMatch("password", "passwordConfirm"),
      }
    );
  }

  get f() {
    return this.AccountRegistrationForm.controls;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    this.submitted = true;
    if (this.AccountRegistrationForm.invalid) {
      return;
    } else {
      const value = this.AccountRegistrationForm.value;
      // Destructuring ES6
      const { passwordConfirm, ...userData } = value;
      console.log(userData);
      this.userService.storeUser(userData).subscribe();
    }
  }

  previous_page(): void {
    this.router.navigateByUrl("/");
  }
}
