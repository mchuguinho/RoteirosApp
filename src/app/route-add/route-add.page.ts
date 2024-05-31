import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoteirosService, Roteiro } from '../services/roteiros.service';
import { PaisesService } from '../services/paises.service';
import { SupabaseService } from '../services/supabase.service';
import { ProfileIdService } from '../services/profile-id.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-route-add',
  templateUrl: './route-add.page.html',
  styleUrls: ['./route-add.page.scss'],
})
export class RouteAddPage implements OnInit {
  
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

  async addRoteiro(){

    const roteiro = {
      nomeRoteiro: this.destinoC,
      user_id: this.profileid.idS,
      destinoC: this.destinoC,
      destinoP: this.destinoP,
      partilhado: false
 
    };

    try {
      // Inserir usuário no Supabase
      await     this.supabaseService.insertRoteiro(roteiro)

      // buscar o id do user
      this.idSR = await this.supabaseService.getUserByName4ID(user.name);
      this.profileid.setId(this.idSR);

      console.log(this.idSR + " .. este está no serviço " + this.profileid.idS);
      console.log(user);

      this.showToast('Usuário registrado com sucesso');

      console.log('Usuário registrado com sucesso');
      // mandar o user para a biblioteca
      this.router.navigateByUrl('/login');
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