import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfileIdService } from '../services/profile-id.service';
import { IonItemSliding } from '@ionic/angular';
import { User } from '../services/user';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.page.html',
  styleUrls: ['./registo.page.scss'],
})
export class RegistoPage implements OnInit, AfterViewInit {

  idSR: number;

  @ViewChild('slidingItem') slidingItem!: IonItemSliding;

  users: User[];
  user: User;
  novoUser = false;
  editarUser = false;
  modalTitle: string;
  isLoadingUsers: boolean;

  public registoForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService,
    private modalController: ModalController,
    private profileid: ProfileIdService,
    private toastController: ToastController
  ) {
    this.idSR = 0;
    this.registoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      apelido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordC: ['', [Validators.required, Validators.minLength(8)]],
      pais: ['', [Validators.required]]
    });
    this.users = [];
    this.modalTitle = '';
    this.user = {
      user_id: 0,
      name: '',
      email: '',
      password: ''
    };
    this.isLoadingUsers = true;
  }

  async ngOnInit() {
    await this.getUsers();
  }

  async ionViewWillEnter() {
    await this.getUsers();
  }

  async getUsers() {
    this.isLoadingUsers = true;
    try {
      this.users = await this.supabaseService.getUsers();
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      this.isLoadingUsers = false;
    }
  }

  async onSubmit() {
    if (this.registoForm.valid) {
      const formValues = this.registoForm.value;

      const user = {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      };

      try {
        // Inserir usuário no Supabase
        await this.supabaseService.insertUser(user);

        // buscar o id do user
        this.idSR = await this.supabaseService.getUserByName4ID(user.name);
        this.profileid.setId(this.idSR);

        console.log(this.idSR + " .. este está no serviço " +  this.profileid.idS);
        console.log(user);

        await this.showToast('Usuário registrado com sucesso');

        console.log('Usuário registrado com sucesso');
        // mandar o user para a biblioteca
        await this.router.navigateByUrl('/login');
      } catch (error) {
        console.error('Erro durante o registro:', error);
        await this.showToast('Erro ao registrar usuário');
      }
    } else {
      // Marcar todos os campos como tocados para exibição das mensagens de erro
      Object.values(this.registoForm.controls).forEach(control => {
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.slidingItem.open('end');
      setTimeout(() => {
        this.slidingItem.close();
      }, 500); // Fechar após meio segundo
    }, 500); // Abrir após meio segundo
  }
}
