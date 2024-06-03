import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { IonItemSliding, ModalController, ToastController } from '@ionic/angular';
import { ProfileIdService } from '../services/profile-id.service';
import { SupabaseService } from '../services/supabase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Roteiro } from '../services/roteiro';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Pontodeinteresse } from '../services/pontosdeinteresse';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation'
import { ViewWillEnter } from '@ionic/angular'

@Component({
  selector: 'app-roteiro',
  templateUrl: './roteiro.page.html',
  styleUrls: ['./roteiro.page.scss'],
})
export class RoteiroPage implements OnInit, AfterViewInit, ViewWillEnter {

  isLoadingPontos = false;
  pontosdeinteresse: Pontodeinteresse[];
  pontodeinteresse: Pontodeinteresse;
  modalTitle: string;

  public intern_ID_inString!: string;
  public nome !: string;
  public cidade!: string;
  public internoIDP!: number;
  private activatedRoute = inject(ActivatedRoute);
  slidingItem: any;
  name:string;

  constructor(   
    private router: Router,
    private supabaseService: SupabaseService,
    private modalController: ModalController,
    private profileid: ProfileIdService,
    private toastController: ToastController) {

      this.name="";
      this.pontosdeinteresse = [];
      this.modalTitle = '';
      this.isLoadingPontos = true;
      this.pontodeinteresse= {
        roteiro_id: this.profileid.lastRoteiroInternoID,
        nome_local: "",
        endereco_local: "",
        custo_acesso: 0,
        custo_transporte: 0,
        curiosidade: "",
        sujestao: "",
        fotografia: ""
      };
      this.profileid.lastRoteiroInternoID=parseInt(this.intern_ID_inString);

    }

  async ngOnInit() {
    
    this.intern_ID_inString = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.profileid.lastRoteiroInternoID=parseInt(this.intern_ID_inString);
    this.internoIDP=this.profileid.lastRoteiroInternoID;

    console.log('ID do Roteiro:', this.profileid.lastRoteiroInternoID + " id interno suposto: " + this.intern_ID_inString);
    this.nome = await this.supabaseService.getRoteiroNameByInternID(this.profileid.lastRoteiroInternoID);
  }

  async ionViewWillEnter() {
    await this.getPontosdeinteresse();
    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }

  async nomeMudou(event: any){

    const novoNome = event.detail.value;

    await this.supabaseService.updateNomeRoteiro(this.profileid.lastRoteiroInternoID, novoNome);

  }

  async getPontosdeinteresse() {
    this.isLoadingPontos = true;
    try {
      this.pontosdeinteresse = await this.supabaseService.getPontosdeInteresse(this.profileid.lastRoteiroInternoID);
    } catch (error) {
      console.error('Erro ao carregar Pontos de Interesse:', error);
    } finally {
      this.isLoadingPontos = false;
    }
  }

  async partilharRoteiro(){
    await this.supabaseService.partilharRoteiro(this.profileid.lastRoteiroInternoID);
    this.showToast("Roteiro Partilhado com sucesso!!")
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

  async navigate() {
    const id_interno = this.profileid.lastRoteiroInternoID; // Replace with your actual id_interno value
    const pontos = await this.supabaseService.getPontosdeInteresse(id_interno);
    const addresses = pontos.map(ponto => ponto.endereco_local); // Assuming 'endereco' is the field with address

    if (addresses.length < 2) {
      console.error('You need at least two addresses to create a route.');
      return;
    }

    const origin = encodeURIComponent(addresses[0]);
    const destination = encodeURIComponent(addresses[addresses.length - 1]);
    const waypoints = addresses.slice(1, -1).map(addr => encodeURIComponent(addr)).join('|');

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
    window.open(url, '_blank'); // Open in a new tab
  }

  async removerPontodeinteresse(id: number) {
    const modal = await this.modalController.create({
      component: ConfirmModalComponent,
      componentProps: {
        title: 'Confirmação',
        message: 'Tem certeza que deseja remover este Ponto de Interesse?',
      },
      breakpoints: [0, 0.3, 0.5, 0.5],
      initialBreakpoint: 0.3
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(id);
      await this.supabaseService.deletePontodeinteresse(id);
      await this.getPontosdeinteresse();
      this.fecharForms();
    }
  }

  fecharForms() {

    this.modalTitle = '';
  }

}
