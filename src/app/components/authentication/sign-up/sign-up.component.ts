import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  AccountRegistrationForm: FormGroup;
  // genders: ['male', 'female'];
  hide = true;
  hide_passconfirm = true;

  constructor(private fb: FormBuilder, protected router: Router) { }

  ngOnInit(): void {
    this.AccountRegistrationForm = this.fb.group ({
      username: new FormControl(''),
      password: new FormControl(''),
      password_confirm: new FormControl(''),
      // gender: new FormControl(),
      gender: ['', [Validators.required]],
      dob: new FormControl(''),
      address: new FormControl(''),
      phone_number: new FormControl(''),
    })
  }

  previous_page(): void {
    this.router.navigateByUrl('/');
  }

  onSubmit() {
    console.log(this.AccountRegistrationForm.value);
  }

  
}
