import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { IonItemSliding, ModalController, ToastController } from '@ionic/angular';
import { ProfileIdService } from '../services/profile-id.service';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {



  public nome: string;
  public password:string; 
  public passwordType: string;
  passEsc: boolean;
  typeIcon : string;
  estaSubmeter = false;
  User: any;
  
  public userUpdateForm: FormGroup;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService,
    private modalController: ModalController,
    private profileid: ProfileIdService,
    private toastController: ToastController
  ) { 

    this.userUpdateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.nome="";
    this.password="";
    this.passwordType="password";
    this.passEsc= true;
    this.typeIcon = "eye-outline";


  }

  async ngOnInit() {

    this.User= await this.supabaseService.getUserById(this.profileid.idS);

    console.log(this.User);

    this.nome = this.User.name;
    this.password = this.User.password;

  }

  showPass(){

    if(this.passEsc === true){

      this.passEsc = false;
      this.passwordType = "text"
      this.typeIcon = "eye-off-outline";

    }else{

      this.passEsc = true;
      this.passwordType = "password"
      this.typeIcon = "eye-outline";

    }


  }

  async onSubmit(){

    if (this.estaSubmeter) {

      return;

    }
    
    this.estaSubmeter = true;


      const formValues = this.userUpdateForm.value;

      if(formValues.name === ""){

        formValues.name=this.User.name;

      }

      if(formValues.password === ""){

        formValues.password=this.User.password;

      }

      const user = {
        name: formValues.name,
        password: formValues.password
      };

      console.log(user);
      console.log(this.profileid.idS);

      try {
        // Inserir usuário no Supabase
        await this.supabaseService.updateUser(user, this.profileid.idS);


        this.showToast('Informações alteradas com sucesso!!');

        console.log('Informações alteradas com sucesso!!');
        // kinda refresh
        this.router.navigateByUrl('/perfil');
      } catch (error) {
        console.error('Erro durante o registro:', error);
        await this.showToast('Erro ao registrar usuário');
      }
    


  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    await toast.present();
  }


}
