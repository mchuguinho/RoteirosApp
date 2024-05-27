import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoteirosService, Roteiro } from '../services/roteiros.service';

@Component({
  selector: 'app-route-add',
  templateUrl: './route-add.page.html',
  styleUrls: ['./route-add.page.scss'],
})
export class RouteAddPage implements OnInit {
  
  public roteiros: Roteiro[] = [];
  public novoRoteiro: string = '';
  public destinoP: string = '';
  public destinoC: string = '';

  constructor(private router: Router, private roteirosService: RoteirosService) {}

  ngOnInit() {
      this.roteiros = this.roteirosService.getRoteiro();
  }

  insertRoteiro() {
      if (this.novoRoteiro && this.destinoP && this.destinoC) {
          const roteiro: Roteiro = {
              id: Date.now(),
              nomeRoteiro: this.novoRoteiro,
              destinoP: this.destinoP,
              destinoC: this.destinoC,
              partilhado: false,
          };
          this.roteirosService.insertRoteiro(roteiro);
          this.novoRoteiro = '';
          this.destinoP = '';
          this.destinoC = '';
      }
  }

  public verRoteiro() {
    this.router.navigateByUrl('/roteiro/' + this.destinoC);
  }

  updateRoteiro(roteiro: Roteiro) {
      this.roteirosService.updateRoteiro(roteiro);
  }

  deleteRoteiro(roteiro: Roteiro) {
      this.roteirosService.deleteRoteiro(roteiro.id);
  }
}