import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms'

const preFile = new File([], "file");

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  AccountRegistrationForm: FormGroup;
  // genders: ['male', 'female'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.AccountRegistrationForm = this.fb.group ({
      username: new FormControl(''),
      password: new FormControl(''),
      password_comfirm: new FormControl(''),
      // gender: new FormControl(),
      gender: ['', [Validators.required]],
      dob: new FormControl(''),
      address: new FormControl(''),
      phone_number: new FormControl(''),
    })
  }

  onSubmit() {
    console.log(this.AccountRegistrationForm.value);
  }

}
