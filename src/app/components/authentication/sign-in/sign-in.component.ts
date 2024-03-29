import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  SignInForm: FormGroup
  hide = true;
  constructor(protected router: Router) { }

  ngOnInit() {
    this.SignInForm = new FormGroup ({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.SignInForm.value);
  }
}
