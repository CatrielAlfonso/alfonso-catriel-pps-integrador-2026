import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { supabase } from './supabase.client';

export interface IPuntaje {
  fecha: string;
  dificultad: string;
  tiempo: number;
  tiempo_parseado: string;
  nombre_usuario: string;
}

@Injectable({
  providedIn: 'root',
})
export class PuntajesService {
 
   authService = inject(AuthService);

  async GuardarPuntaje(puntaje: number, dificultad: string) {
    const fecha = new Date();
    const fechaFormateada = `${fecha.getFullYear()}/${fecha.getMonth()+1}/${fecha.getDate()}`;

    const nombreUsuario = await this.authService.getMailUsuario();

    await supabase.from('puntajes').insert([{
      nombre_usuario: nombreUsuario,
      tiempo: puntaje,
      tiempo_parseado: puntaje + ' segundos',
      dificultad,
      fecha: fechaFormateada
    }]);
  }

  async ObtenerPuntajes(dificultad: string) {
    const { data } = await supabase
      .from('puntajes')
      .select('*')
      .eq('dificultad', dificultad)
      .order('tiempo', { ascending: true })
      .limit(5);

    return data ?? [];
  }

}
