import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  EditItemForm: FormGroup

  item_name: string

  constructor(protected router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    this.EditItemForm = this.fb.group({
      item_name_replace: new FormControl(''),
      item_price_replace: new FormControl(''),
    });

    this.route.queryParams.subscribe((params) => {
      this.item_name = params['name'];
    });

  }

  ngOnInit() {
    this.EditItemForm.setValue({
      item_name_replace: 'Salt',
      item_price_replace: '0.95', 
    });
  }

  onSubmit() {
    console.log(this.EditItemForm.value);
    console.log("item name:", this.item_name);
  }

}
