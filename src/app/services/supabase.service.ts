import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { User } from './user';
import { Roteiro } from './roteiro';

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
      .order('name', { ascending: true });
  
    if (error) {
      return [];
    }
  
    return data as User[];
  }

  async getRoteiros(id: number): Promise<Roteiro[]> {
    const { data, error } = await this.supabaseClient
      .from('roteiros')
      .select('*')
      .eq('user_id', id)
      .order('nomeRoteiro', { ascending: true });
  
    if (error) {
      return [];
    }
  
    return data as Roteiro[];
  }

  async getUserById(id: number): Promise<User> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .select('*')
      .eq('user_id', id)
      .single();

    if (error) {
      throw error;
    }

    return data as User;
  }

  async getUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error) {
      console.error('Erro ao buscar usuário:', error);
      throw null;
    }

    return data ;
  }

  async getUserByName4ID(nome: string): Promise<number> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .select('user_id')
      .eq('name', nome)
      .single();

    if (error) {
      throw error
    }

    return data.user_id;
  }

  async getUserByEmail4ID(email: string): Promise<number> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .select('user_id')
      .eq('email', email)
      .single();

    if (error) {
      throw error
    }

    return data.user_id;
  }

  async insertRoteiro(roteiro: Roteiro) {
    const { data, error } = await this.supabaseClient
      .from('roteiros')
      .insert(roteiro)
      .single();
  
    if (error) {
      return null;
    }
    console.log(data);
    return data;
  }
  
  async updateRoteiro(roteiro: Roteiro): Promise<void> {
    const { data, error } = await this.supabaseClient
      .from('roteiros')
      .update({
        nomeRoteiro: roteiro.nomeRoteiro,
      })
      .eq('roteiro_id', roteiro.roteiro_id);

    if (error) {
      console.error(error);
      throw new Error('Erro ao atualizar roteiro');
    }
  }

  async partilharRoteiro(id : number): Promise<void> {
    const { data, error } = await this.supabaseClient
      .from('roteiros')
      .update({
        partilhado: true,
      })
      .eq('roteiro_id', id);

    if (error) {
      console.error(error);
      throw new Error('Erro ao partilhar');
    }
  }
  
  async deleteRoteiro(id: number): Promise<void> {
    await this.supabaseClient.from('roteiros').delete().eq('roteiro_id', id);
  }  

  async insertUser(user: User) {
    const { data, error } = await this.supabaseClient
      .from('users')
      .insert(user)
      .single();
  
    if (error) {
      return null;
    }
    console.log(data);
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
      .eq('user_id', user.user_id);

    if (error) {
      console.error(error);
      throw new Error('Erro ao atualizar user');
    }
  }
  
  async deleteUser(id: number): Promise<void> {
    await this.supabaseClient.from('users').delete().eq('user_id', id);
  }  

}

