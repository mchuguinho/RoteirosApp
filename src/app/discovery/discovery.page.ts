import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonItemSliding, ModalController, ToastController } from '@ionic/angular';
import { ProfileIdService } from '../services/profile-id.service';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';
import { Roteiro } from '../services/roteiro';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.page.html',
  styleUrls: ['./discovery.page.scss'],
})
export class DiscoveryPage implements OnInit {

  @ViewChild('slidingItem') slidingItem!: IonItemSliding;

  iconName : string = "add-circle-outline";
  iconColor : string = "dark";
  isLoadingRoteiros = false;
  roteiros: Roteiro[];
  roteiro: Roteiro;
  modalTitle: string;
  idT : number;
  novoRoteiro = false;
  public results: Roteiro[];

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private modalController: ModalController,
    private profileid: ProfileIdService,
    private toastController: ToastController
  ) {


    this.roteiros = [];
    this.results = [...this.roteiros]
    this.modalTitle = '';
    this.roteiro = {
      user_id: this.profileid.idS,
      id_interno: 0,
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

  handleInput(event : any) {
    const query = event.target.value.toLowerCase();
    this.results = this.roteiros.filter(roteiro => 
      roteiro.nomeRoteiro.toLowerCase().includes(query)
    );
  }

  async ionViewWillEnter() {
    await this.getRoteiros();
    this.results= this.roteiros;
  }

  async getRoteiros() {
    this.isLoadingRoteiros = true;
    try {
      this.roteiros = await this.supabaseService.getRoteirosPartilhados();
      this.results = this.roteiros;
    } catch (error) {
      console.error('Erro ao carregar roteiro:', error);
    } finally {
      this.isLoadingRoteiros = false;
    }
  }

  async addPartilhadoBiblioteca(id_interno : number, event : Event){

    this.supabaseService.letMeCopyThatRoteiro(id_interno);
    await this.showToast("Roteiro Adicionado com sucesso na Biblioteca!!");

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

  saveRoteiro(event : Event) {
    const button = event.target as HTMLElement;
    const icon = button.querySelector('ion-icon');
    if (icon) {
      icon.name = 'checkmark-circle';
      icon.color = 'success';
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    await toast.present();
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
