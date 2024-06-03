import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfileIdService } from '../services/profile-id.service';
import { IonItemSliding } from '@ionic/angular';
import { User } from '../services/user';
import { ViewWillEnter } from '@ionic/angular'
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewWillEnter {
  public loginForm: FormGroup;
  idSL: number;

  constructor( private formBuilder: FormBuilder, private supabaseService: SupabaseService, private router: Router, private profileid: ProfileIdService, private toastController: ToastController) {
 
    this.idSL = 0;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  ngOnInit() { }

  ionViewWillEnter(): void {
    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }

  async onSubmit() {

    const formValues = this.loginForm.value;
    const { email, password } = formValues;

    try {
      const user = await this.supabaseService.getUserByEmailAndPassword(email, password);

      if (user) {
        await this.showToast('Login realizado com sucesso');

        this.idSL = await this.supabaseService.getUserByEmail4ID(email);
        this.profileid.setId(this.idSL);
        console.log("login id --:" + this.idSL);

        this.router.navigateByUrl('/biblio');
      } else {
        await this.showToast('Email ou password inválidos');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      await this.showToast('Erro durante o login');
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
