import { ParseSourceFile } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { ModalController } from '@ionic/angular';


import { ViewChild } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { User } from '../services/user';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.page.html',
  styleUrls: ['./registo.page.scss'],
})
export class RegistoPage {
  
  @ViewChild('slidingItem') slidingItem!: IonItemSliding;

    users: User[];
    user: User;
    novoUser = false;
    editarUser = false;
    modalTitle: string;
    isLoadingUsers: boolean;

  public registoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private supabaseService: SupabaseService, private modalController: ModalController) {
    this.registoForm = this.formBuilder.group({
      name: ['', [Validators.required,  Validators.minLength(2)]],
      apelido: ['', [Validators.required,  Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,  Validators.minLength(8)]],
      passwordC: ['', [Validators.required,  Validators.minLength(8)]],
      pais: ['',[Validators.required]]
    });
    this.users = [];
    this.modalTitle = '';
    this.user = {
        user_id: null || 0,
        name: '',
        email: '',
        password:''
    };
    this.isLoadingUsers = true;
  }

  async ionViewWillEnter() {
    await this.getUsers();
}

async getUsers() {
    this.isLoadingUsers = true;
    this.users = await this.supabaseService.getUsers();
    this.isLoadingUsers = false;
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

      console.log(user);

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

  ngAfterViewInit() {
    setTimeout(() => {
        this.slidingItem.open('end');
        setTimeout(() => {
            this.slidingItem.close();
        }, 500); // Fechar após meio segundo
    }, 500); // Abrir após meio segundo
}

}
