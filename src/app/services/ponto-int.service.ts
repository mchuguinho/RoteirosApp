import { Injectable } from '@angular/core';

    export interface PontoInteresse {
        id: number;
        nomeLocal: string;
        endereco: string;
        custoLocal : number;
        custoTransporte : number;
        curiosidade : string;
        sugestao : string; 
    }

    @Injectable({
        providedIn: 'root'
    })

    export class PontoIntService {
        private pontos: PontoInteresse[];

        constructor() {
            this.pontos = [];
        }

        getPontos(): PontoInteresse[] {
            return this.pontos;
        }

        insertPontos(pontoI: PontoInteresse) {
            this.pontos.push(pontoI);
        }

        updatePontos(pontoI: PontoInteresse) {
            const index = this.pontos.findIndex(p => p.id === pontoI.id);
            if (index >= 0) {
                this.pontos[index] = pontoI;
            }
        }

        deletePontos(id: number) {
            const index = this.pontos.findIndex(p => p.id === id);
            if (index >= 0) {
                this.pontos.splice(index, 1);
            }
        }

    }