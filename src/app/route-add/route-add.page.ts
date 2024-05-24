import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-add',
  templateUrl: './route-add.page.html',
  styleUrls: ['./route-add.page.scss'],
})
export class RouteAddPage implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }

  public Next() {
    this.router.navigateByUrl('/login');
  }

}