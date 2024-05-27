import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-roteiro',
  templateUrl: './roteiro.page.html',
  styleUrls: ['./roteiro.page.scss'],
})
export class RoteiroPage implements OnInit {

  public roteiro!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.roteiro = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
