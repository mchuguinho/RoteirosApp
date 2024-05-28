import { ParseSourceFile } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { ModalController } from '@ionic/angular';


import { ViewChild } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.page.html',
  styleUrls: ['./registo.page.scss'],
})
export class RegistoPage {

  public registoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private supabaseService: SupabaseService, private modalController: ModalController) {
    this.registoForm = this.formBuilder.group({
      name: ['', [Validators.required,  Validators.minLength(2)]],
      apelido: ['', [Validators.required,  Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,  Validators.minLength(8)]],
      passwordC: ['', [Validators.required,  Validators.minLength(8)]]
    });
  }

  async onSubmit() {
    if (this.registoForm.valid) {
      const formValues = this.registoForm.value;

      const user = {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      };

      // Inserir usuário no Supabase
      const result = await this.supabaseService.insertUser(user);

      if (result) {
        console.log('Usuário registrado com sucesso:', result);
        // Redirecionar ou dar feedback ao usuário
      } else {
        console.error('Erro ao registrar usuário');
      }
    } else {
      // Marcar todos os campos como tocados para exibição das mensagens de erro
      Object.values(this.registoForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }



}
