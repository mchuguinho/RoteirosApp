import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { User } from './user';
import { Roteiro } from './roteiro';
import { Pontodeinteresse } from './pontosdeinteresse';
import { ProfileIdService } from '../services/profile-id.service';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabaseUrl = 'https://oegblsocdnheewxbpsqu.supabase.co'; // URL copiado no passo acima 
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lZ2Jsc29jZG5oZWV3eGJwc3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5MzU2MDYsImV4cCI6MjAzMjUxMTYwNn0.dg5_v-CpjjwJOaRtGxz9A8MwRH-kDD_RCfIBJiUCnjY'; // anon public copiada no passo acima;
  private supabaseClient: SupabaseClient;

  constructor(private profileid: ProfileIdService) {
    this.supabaseClient = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async getPontosdeInteresse(id_interno: number): Promise<Pontodeinteresse[]> {

    const roteiroID = await this.getRoteiroIDByInternID(id_interno);

    const { data, error } = await this.supabaseClient
      .from('pontosdeinteresse')
      .select('*')
      .eq('roteiro_id', roteiroID)
      .order('ponto_id', { ascending: true });

    if (error) {
      console.log("deu não amigo");
      return [];
    }

    return data as Pontodeinteresse[];

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

  async getRoteiros(id_user: number): Promise<Roteiro[]> {
    const { data, error } = await this.supabaseClient
      .from('roteiros')
      .select('*')
      .eq('user_id', id_user)
      .order('nomeRoteiro', { ascending: true });

    if (error) {
      return [];
    }

    return data as Roteiro[];
  }

  async getRoteirosPartilhados(): Promise<Roteiro[]> {
    const { data, error } = await this.supabaseClient
      .from('roteiros')
      .select('*')
      .eq('partilhado', true)
      .order('nomeRoteiro', { ascending: true });

    if (error) {
      return [];
    }

    return data as Roteiro[];
  }

  async letMeCopyThatRoteiro(idinterno: number) {

    const { data, error } = await this.supabaseClient
      .from('roteiros')
      .select('*')
      .eq('id_interno', idinterno)
      .single();

    const roteiroNovo = {
      nomeRoteiro: data.nomeRoteiro,
      user_id: this.profileid.idS,
      destinoC: data.destinoC,
      destinoP: data.destinoP,
      partilhado: false,
      id_interno: Math.random() * 100000000000000000,

    };

    if (data.user_id != this.profileid.idS) {

      this.insertRoteiro(roteiroNovo);

    }


  }

  async updateNomeRoteiro(id_roteiroI: number, novoNome: string): Promise<void> {
    const { data, error } = await this.supabaseClient
      .from('roteiros')
      .update({
        nomeRoteiro: novoNome,
      })
      .eq('id_interno', id_roteiroI);

    if (error) {
      console.error(error);
      throw new Error('Erro ao atualizar roteiro');
    }
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

  async getUserByEmailAndPassword(email: string, password: string): Promise<User> {
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

    return data;
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

  async getRoteiroByInternID(idInterno: number): Promise<Roteiro> {
    const { data, error } = await this.supabaseClient
      .from('roteiros')
      .select('*')
      .eq('id_interno', idInterno)
      .single();

    if (error) {
      throw error
    }

    return data;
  }

  async getRoteiroNameByInternID(idInterno: number): Promise<string> {
    const { data, error } = await this.supabaseClient
      .from('roteiros')
      .select('nomeRoteiro')
      .eq('id_interno', idInterno)
      .single();

    if (error) {
      throw error
    }

    return data.nomeRoteiro;
  }

  async getRoteiroIDByInternID(idInterno: number): Promise<number> {
    const { data, error } = await this.supabaseClient
      .from('roteiros')
      .select('roteiro_id')
      .eq('id_interno', idInterno)
      .single();

    if (error) {
      throw error
    }

    return data.roteiro_id;
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

  async insertPontodeInteresse(pontodeinteresse: Pontodeinteresse) {
    const { data, error } = await this.supabaseClient
      .from('pontosdeinteresse')
      .insert(pontodeinteresse)
      .single();

    if (error) {
      return null;
    }
    console.log(data);
    return data;
  }

  async partilharRoteiro(id: number): Promise<void> {
    const { data, error } = await this.supabaseClient
      .from('roteiros')
      .update({
        partilhado: true,
      })
      .eq('id_interno', id);

    if (error) {
      console.error(error);
      throw new Error('Erro ao partilhar');
    }
  }

  async deleteRoteiro(id: number): Promise<void> {

    const { error : a} = await this.supabaseClient
    .from('pontosdeinteresse')
    .delete()
    .eq('roteiro_id', id);

  if (a) {
    console.error('Erro ao eliminar pontos:', a);
    throw new Error('Não deu para eliminar PDI');
  }

  const { error } = await this.supabaseClient
    .from('roteiros')
    .delete()
    .eq('roteiro_id', id);

  if (error) {
    console.error('Erro ao eliminar roteiro:', error);
    throw new Error('Não deu para eliminar o roteiro');
  }

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

  async updateUser(user: User, id: number): Promise<void> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .update({
        name: user.name,
        password: user.password
      })
      .eq('user_id', id);

    if (error) {
      console.error(error);
      throw new Error('Erro ao atualizar user');
    }
  }

  async deleteUser(id: number): Promise<void> {
    await this.supabaseClient.from('users').delete().eq('user_id', id);
  }


}

