import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileIdService {

  public idS : number;
  public lastRoteiroInternoID: number;
  public roteiroPartilhadoAdicionado: number;

  constructor() { 
    this.idS=0;
    this.lastRoteiroInternoID = 0;
    this.roteiroPartilhadoAdicionado = 0;
  }

  getId(){
    return this.idS;
  }

  setId(idN: number){

    this.idS=idN;

  }

  setRoteiroID(lastRoteiroIDN: number){

    this.lastRoteiroInternoID=lastRoteiroIDN;

  }
}
