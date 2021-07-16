import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//! Interface tương tự cấu trúc tư định nghĩa. Import từ file interfaces/category (file định nghĩa)
import { Category } from '../../interfaces/category/category';
//!


//! send data without showing in URL
import { NavigationExtras } from '@angular/router';

const ELEMENT_DATA: Category[] = [
  {category_name: 'Hydrogen', category_avatar: 'H'},
  { category_name: 'Lilimall', category_avatar: 'A'},
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['category_name', 'category_avatar', 'action'];
  dataSource = ELEMENT_DATA;
  

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoEdit(category_name: string) {
    // console.log("position", row.position)
    let navigationExtras: NavigationExtras = {
      queryParams: { name: category_name },
    };
    this.router.navigate(['/admin/admin/category/edit'], navigationExtras);
  }

}
