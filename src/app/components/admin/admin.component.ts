import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoadingScreenService } from '../../services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router,
              public loadingScreenService: LoadingScreenService,
              ) { }

  ngOnInit() {
  }

  reload_page(): void {
    this.router.navigateByUrl('/admin');
  }
}

