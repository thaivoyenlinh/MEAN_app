import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
//! FormBuilder có hàm group ( nhóm các FormControl ) có tác dụng tương tự new FormGroup (tạo object)
//! Router dùng navigate... để điều hướng về một trang mong muốn (php: location)

//! ActivatedRoute to catch a URL parameter

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  EditCategoryForm: FormGroup
  
  //? declare in both send and receive component
  category_name: string //?
  
  //* Router to catch the data form Category Component
  constructor(protected router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    this.EditCategoryForm = this.fb.group({
      category_name_replace: new FormControl(''),
      category_avatar_replace: new FormControl(''),
    });
    
    //! catch the data 
    this.route.queryParams.subscribe((params) => {
      this.category_name = params['name'];
    }); //!
    
  }

  ngOnInit() {
    this.EditCategoryForm.setValue({
      category_name_replace: 'thaivoyenlinh',
      category_avatar_replace: 'b1809476',
    });
  }

  onSubmit() {
    console.log(this.EditCategoryForm.value);
    console.log("category_name" ,this.category_name);
  }

}
