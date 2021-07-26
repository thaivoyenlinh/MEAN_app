import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  CreateItemForm: FormGroup

  constructor(protected router: Router) { }

  ngOnInit() {
    this.CreateItemForm = new FormGroup ({
      item_name: new FormControl(''),
      item_price: new FormControl(''),
      item_category: new FormControl(''),
      item_discription: new FormControl(''),
      item_image: new FormControl(''),
    })
  }

  onSubmit() {
    console.log(this.CreateItemForm.value);
  }

}
