import { Injectable } from '@angular/core';
import { PontoInteresse } from './ponto-int.service';

export interface Roteiro {
  id: number;
  nomeRoteiro : string;
  destinoP: string;
  destinoC: string;
  Pontos?: PontoInteresse[];
  partilhado: boolean;

}

@Injectable({
    providedIn: 'root'
})

export class RoteirosService {
    private roteiros: Roteiro[];

    constructor() {
        this.roteiros = [];
    }

    getRoteiro(): Roteiro[] {
        return this.roteiros;
    }

    insertRoteiro(roteiro: Roteiro) {
        this.roteiros.push(roteiro);
    }

    updateRoteiro(roteiro: Roteiro) {
        const index = this.roteiros.findIndex(t => t.id === roteiro.id);
        if (index >= 0) {
            this.roteiros[index] = roteiro;
        }
    }

    deleteRoteiro(id: number) {
        const index = this.roteiros.findIndex(t => t.id === id);
        if (index >= 0) {
            this.roteiros.splice(index, 1);
        }
    }

    getRoteirosPartilhados() {
        const roteirosPartilhados = this.roteiros.filter(roteiro => roteiro.partilhado);
        return roteirosPartilhados;
    }

}