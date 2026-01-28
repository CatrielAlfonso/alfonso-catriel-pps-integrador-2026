import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './supabase-client.service'; 
import { Creditos } from '../classes/creditos';

@Injectable({
  providedIn: 'root',
})
export class CreditosService {

   private supabase: SupabaseClient;
  public userLog!: Creditos;

  //const supabase = supabase;

  constructor() {
    this.supabase = supabase;
  }

  // Traer datos de un usuario
  async traerCredito(id: number) {
    const { data, error } = await this.supabase
      .from('creditos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    this.userLog = data as Creditos;
    return this.userLog;
  }

  // Guardar cambios
  async Cargar(credito: Creditos) {
    const { error } = await this.supabase
     .from('creditos')
    .upsert({ // Cambiamos update por upsert
      id: credito.id, // Es vital enviar el ID para que sepa qué fila actualizar
      usuario: credito.usuario,
      credito: credito.credito,
      cargo10: credito.cargo10,
      cargo50: credito.cargo50,
      cargo100: credito.cargo100
    });
      

    if (error) throw error;
  }

  // Crear usuario si no existe (opcional)
  async CrearUsuario(credito: Creditos) {
    const { error } = await this.supabase
      .from('creditos')
      .insert(credito);

    if (error) throw error;
  }
}
