import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileIdService {

  public idS : number;
  public lastRoteiroIDS: number;

  constructor() { 
    this.idS=0;
    this.lastRoteiroIDS = 0;
  }

  getId(){
    return this.idS;
  }

  setId(idN: number){

    this.idS=idN;

  }

  setRoteiroID(lastRoteiroIDN: number){

    this.lastRoteiroIDS=lastRoteiroIDN;

  }
}
