import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { ToastController } from '@ionic/angular';
import { ProfileIdService } from '../services/profile-id.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router,
    private profileid: ProfileIdService,
    private toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      const { email, password } = formValues;

      try {
        const user = await this.supabaseService.getUserByEmailAndPassword(email, password);

        if (user) {
          await this.showToast('Login realizado com sucesso');
          this.router.navigateByUrl('/home');
        } else {
          await this.showToast('Email ou password inválidos');
        }
      } catch (error) {
        console.error('Erro durante o login:', error);
        await this.showToast('Erro durante o login');
      }
    } else {
      // Marcar todos os campos como tocados para exibição das mensagens de erro
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
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
