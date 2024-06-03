import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, ViewWillEnter {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }

  public login() {
    this.router.navigateByUrl('/login');
  }

  public registo() {
    this.router.navigateByUrl('/registo');
  }

}
