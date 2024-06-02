import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoteirosService, Roteiro } from '../services/roteiros.service';
import { PaisesService } from '../services/paises.service';
import { SupabaseService } from '../services/supabase.service';
import { ProfileIdService } from '../services/profile-id.service';
import { ToastController } from '@ionic/angular';
import { ViewWillEnter } from '@ionic/angular'

@Component({
  selector: 'app-route-add',
  templateUrl: './route-add.page.html',
  styleUrls: ['./route-add.page.scss'],
})
export class RouteAddPage implements OnInit{
  
  podes = false;
  counterID = 1;
  destinoP: any;
  paises: any[] = [];
  cidades: any[] = [];
  public destinoC: string = '';

  constructor(    private router: Router,
    private supabaseService: SupabaseService,
    private profileid: ProfileIdService,
    private toastController: ToastController,
     private paisesService: PaisesService) {}

  ngOnInit() {

      this.paisesService.getPaises().subscribe(data => {
        this.paises = data.paises;
      });  
  }

  onPaisChange(event: any) {
    const selectedPais = event.detail.value;
    if (selectedPais && selectedPais.cidades) {
      this.cidades = selectedPais.cidades;
    } else {
      this.cidades = [];
    }
    this.destinoC = '';  // Resetar a cidade selecionada ao mudar o país
  }

  onPaissChange(event: any) {
    if(this.destinoC != ""){
      this.podes = true;
    }
  }

  async addRoteiro(){

    

    const roteiro = {
      nomeRoteiro: this.destinoC,
      user_id: this.profileid.idS,
      destinoC: this.destinoC,
      destinoP: this.destinoP.nome,
      partilhado: false,
      id_interno : Math.random() * 100000000000000000,
 
    };

    try {

      // Inserir roteiro no Supabase
      await  this.supabaseService.insertRoteiro(roteiro);
      this.profileid.lastRoteiroInternoID = roteiro.id_interno;

      console.log(this.profileid.lastRoteiroInternoID + "  == " + roteiro.id_interno);

      this.showToast('Roteiro criado com sucesso');

      this.router.navigateByUrl('/roteiro/' + this.profileid.lastRoteiroInternoID );

    } catch (error) {
      console.error('Erro durante o registro:', error);
      await this.showToast('Erro ao registrar usuário');
    }

  }
  
  public verRoteiro() {
    this.router.navigateByUrl('/roteiro/' + this.destinoC);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    await toast.present();
  }

}