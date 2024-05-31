import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Perfil', url: '/folder/inbox', icon: 'person' },
    { title: 'Biblioteca', url: '/biblio', icon: 'book' },
    { title: 'Descobrir', url: '/discovery', icon: 'earth' },
  ];
  
  constructor() {}
}
