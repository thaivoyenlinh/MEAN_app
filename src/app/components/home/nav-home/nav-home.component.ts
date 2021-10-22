import { Component, OnInit } from '@angular/core';
import { LoadingScreenService } from '../../../services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.scss']
})
export class NavHomeComponent implements OnInit {

  constructor(public loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
  }

  // * use to reload page/component
  reloadPage(): void {
    window.location.reload();
  }

}
