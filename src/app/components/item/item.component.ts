import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Item } from 'src/app/interfaces/category/category';

import { NavigationExtras } from '@angular/router';

const DATA: Item[] = [
  { item_name: 'Sugar', item_price: '1.20', item_category: 'lilimall', item_description: '1kg', item_images: '', item_created_time: '123', item_updated_time: '4569'},
  { item_name: 'Candy', item_price: '2.20', item_category: 'lilimall', item_description: '500gram', item_images: '', item_created_time: '123', item_updated_time: '4569' }
];

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  displayedColumns: string[] = ['item_name', 'item_price', 'item_category', 'item_description', 'item_images', 'item_created_time', 'item_updated_time', 'action'];
  dataSource = DATA;

  constructor(protected router: Router) { }

  ngOnInit() {
  }

  gotoEdit(item_name: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: { name: item_name },
    };
    this.router.navigate(['/admin/item/edit'], navigationExtras);
  }

}
