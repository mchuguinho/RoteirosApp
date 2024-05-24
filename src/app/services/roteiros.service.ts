import { Injectable } from '@angular/core';
import { PontoInteresse } from './ponto-int.service';

export interface Roteiro {
  id: number;
  nomeRoteiro : string;
  destinoP: string;
  destinoC: string;
  Pontos: PontoInteresse[];
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

    getTarefas(): Roteiro[] {
        return this.roteiros;
    }

    insertTarefa(roteiro: Roteiro) {
        this.roteiros.push(roteiro);
    }

    updateTarefa(roteiro: Roteiro) {
        const index = this.roteiros.findIndex(t => t.id === roteiro.id);
        if (index >= 0) {
            this.roteiros[index] = roteiro;
        }
    }

    deleteTarefa(id: number) {
        const index = this.roteiros.findIndex(t => t.id === id);
        if (index >= 0) {
            this.roteiros.splice(index, 1);
        }
    }

    getTarefasConcluidas() {
        const roteirosPartilhados = this.roteiros.filter(roteiro => roteiro.partilhado);
        return roteirosPartilhados;
    }

}