import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabaseUrl = 'https://oegblsocdnheewxbpsqu.supabase.co'; // URL copiado no passo acima 
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lZ2Jsc29jZG5oZWV3eGJwc3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5MzU2MDYsImV4cCI6MjAzMjUxMTYwNn0.dg5_v-CpjjwJOaRtGxz9A8MwRH-kDD_RCfIBJiUCnjY'; // anon public copiada no passo acima;
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async getUsers(): Promise<User[]> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .select('*')
      .order('nome', { ascending: true });
  
    if (error) {
      return [];
    }
  
    return data as User[];
  }

  async getUserById(id: number): Promise<User> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data as User;
  }

  async insertUser(user: User) {
    const { data, error } = await this.supabaseClient
      .from('users')
      .insert(user)
      .single();
  
    if (error) {
      return null;
    }
    return data;
  }
  
  async updateUser(user: User): Promise<void> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .update({
        nome: user.name,
        email: user.email,
        password: user.password
      })
      .eq('id', user.id);

    if (error) {
      console.error(error);
      throw new Error('Erro ao atualizar user');
    }
  }
  
  async deleteUser(id: number): Promise<void> {
    await this.supabaseClient.from('users').delete().eq('id', id);
  }  

}

