import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  symbol: string;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', symbol: 'H'},
  {position: 2, name: 'Helium', symbol: 'He'},
  {position: 3, name: 'Lithium', symbol: 'Li'},
];



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'symbol', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  clickEdit(row) {
    console.log("position", row.position)
  }

}
