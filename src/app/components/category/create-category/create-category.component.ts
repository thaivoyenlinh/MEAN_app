import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  CreateCategoryForm: FormGroup

  constructor(protected router: Router) { }

  ngOnInit() {
    this.CreateCategoryForm = new FormGroup ({
      category_name: new FormControl(''),
      category_avatar: new FormControl(''),
    })
  }

  onSubmit() {
    console.log(this.CreateCategoryForm.value);
  }

}
