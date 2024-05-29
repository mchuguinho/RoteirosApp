import { Component, OnInit } from '@angular/core';
import { User } from '../services/user';
import { SupabaseService } from '../services/supabase.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  users: User[];
  user: User;
  novoUser = false;
  editarUser = false;
  modalTitle: string;
  isLoadingUsers: boolean;


constructor( private supabaseService: SupabaseService, private modalController: ModalController) {

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

}
