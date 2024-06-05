import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaisesService } from '../services/paises.service';
import { SupabaseService } from '../services/supabase.service';
import { ProfileIdService } from '../services/profile-id.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';


@Component({
  selector: 'app-add-ponto-int',
  templateUrl: './add-ponto-int.page.html',
  styleUrls: ['./add-ponto-int.page.scss'],
})
export class AddPontoIntPage implements OnInit, ViewWillEnter{

  selectedFileName: string = "Carregue a sua fotografia";
  iconName : string = "camera";
  iconColor : string = "primary";
  custo: number = 0;
  public addForm: FormGroup;
  estaSubmeter = false;
  public nomeP = "";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService,
    private profileid: ProfileIdService,
    private toastController: ToastController
  ) {

    this.addForm = this.formBuilder.group({
      nome_local: ['', [Validators.required, Validators.minLength(2)]],
      endereco: ['', [Validators.required, Validators.minLength(2)]],
      custo: ['', [Validators.required, Validators.minLength(2)]],
      custoT: ['', [Validators.required, Validators.minLength(2)]],
      curiosidade: ['', [Validators.required, Validators.minLength(2)]],
      sujestao: ['', [Validators.required]]
    });
    

   }

   ionViewWillEnter(): void {
    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }

  formataNumero(e: any, separador: string = '.', decimais: number = 2) {
    let a:any = e.value.split('');
    let ns:string = '';
    a.forEach((c:any) => { if (!isNaN(c)) ns = ns + c; });
    ns = parseInt(ns).toString();
    if (ns.length < (decimais+1)) { ns = ('0'.repeat(decimais+1) + ns); ns = ns.slice((decimais+1)*-1); }
    let ans = ns.split('');
    let r = '';
    for (let i=0; i < ans.length; i++) if (i == ans.length - decimais) r = r + separador + ans[i]; else r = r + ans[i];
    e.value = r;
  }

  onFileSelected(event : Event): void {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0) {
      const file = input.files[0];
      this.carregarFicheiro(file);
    }
  }

  carregarFicheiro(file: File): void {
    setTimeout(() => {
      console.log('Upload feito com sucesso:', file);
      this.iconName = "checkmark-circle";
      this.iconColor = "success";
      this.selectedFileName = 'Fotografia carregada com sucesso!';
    }, 1000); 
  }

  async onSubmit(){

    if (this.estaSubmeter) {

      return;

    }

    this.estaSubmeter = true;

    if (this.addForm.valid) {
      const formValues = this.addForm.value;

      console.log(this.profileid.lastRoteiroInternoID);
      const id = await this.supabaseService.getRoteiroIDByInternID(this.profileid.lastRoteiroInternoID);
      console.log("este é o id do roteiro: " + id);

      const pontodeinteresse = {
        roteiro_id: id,
        nome_local: formValues.nome_local,
        endereco_local: formValues.endereco,
        custo_acesso: formValues.custo,
        custo_transporte: formValues.custoT,
        curiosidade: formValues.curiosidade,
        sujestao: formValues.sujestao
      };

      try {
        // Inserir Ponto de Interesse no Supabase
        await this.supabaseService.insertPontodeInteresse(pontodeinteresse);
        this.showToast('Ponto de interesse registrado com sucesso');

        console.log('PDI registrado com sucesso');
        // mandar o user para a biblioteca
      
      } catch (error) {
        console.error('Erro durante o registro:', error);
        await this.showToast('Erro ao registrar Ponto de Interesse');
      }
    } else {
      // Marcar todos os campos como tocados para exibição das mensagens de erro
      Object.values(this.addForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }

  }

  async ngOnInit() {

   this.nomeP = await this.supabaseService.getRoteiroNameByInternID(this.profileid.lastRoteiroInternoID);

  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000
    });
    await toast.present();
  }

}
