import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonItemSliding, ModalController, ToastController } from '@ionic/angular';
import { ProfileIdService } from '../services/profile-id.service';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';
import { Roteiro } from '../services/roteiro';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-biblio',
  templateUrl: './biblio.page.html',
  styleUrls: ['./biblio.page.scss'],
})
export class BiblioPage implements OnInit, AfterViewInit {

  @ViewChild('slidingItem') slidingItem!: IonItemSliding;

  isLoadingRoteiros = false;
  roteiros: Roteiro[];
  roteiro: Roteiro;
  modalTitle: string;
  idT : number;
  novoRoteiro = false;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private modalController: ModalController,
    private profileid: ProfileIdService,
    private toastController: ToastController
  ) {

    this.roteiros = [];
    this.modalTitle = '';
    this.roteiro = {
      user_id: this.profileid.idS,
      nomeRoteiro : '',
      destinoP: '',
      destinoC: '',
      partilhado: false
    };
    this.idT= this.profileid.idS;

    this.isLoadingRoteiros = true;

   }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getRoteiros();
  }

  async getRoteiros() {
    this.isLoadingRoteiros = true;
    try {
      this.roteiros = await this.supabaseService.getRoteiros(this.idT);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      this.isLoadingRoteiros = false;
    }
  }


  async removerRoteiro(id: number) {
    const modal = await this.modalController.create({
      component: ConfirmModalComponent,
      componentProps: {
        title: 'Confirmação',
        message: 'Tem certeza que deseja remover este Roteiro?',
      },
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.3
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data) {
      await this.supabaseService.deleteRoteiro(id);
      await this.getRoteiros();
      this.fecharForms();
    }
  }

  fecharForms() {

    this.modalTitle = '';
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.slidingItem.open('end');
      setTimeout(() => {
        this.slidingItem.close();
      }, 500); // Fechar após meio segundo
    }, 500); // Abrir após meio segundo
  }

}