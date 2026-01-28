import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { supabase } from './../services/supabase-client.service';

export interface IMensaje {
  mensaje: string;
  fechaMensaje: Date;
  fechaMensajeFormateada: string;
  usuario: string;
}


@Injectable({ providedIn: 'root' })
export class ChatService {
  

  private mensajes$ = new BehaviorSubject<IMensaje[]>([]);
  private canalActual?: any;

  async iniciarChat(aula: "Aula-A" | "Aula-B") {

    // 🔹 Cargar mensajes iniciales
    const { data } = await supabase
      .from('mensajes_chat')
      .select('*')
      .eq('aula', aula)
      .order('fecha', { ascending: true });

    this.mensajes$.next(data ?? []);

    // 🔹 Cerrar canal anterior si existía
    if (this.canalActual) {
      supabase.removeChannel(this.canalActual);
    }

    // 🔹 Escuchar realtime solo de esta aula
    this.canalActual = supabase
      .channel('chat-' + aula)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mensajes_chat', filter: `aula=eq.${aula}` },
        payload => {
          this.mensajes$.next([...this.mensajes$.value, payload.new as IMensaje]);
        })
      .subscribe();
  }

  ObtenerMensajes(): Observable<IMensaje[]> {
    return this.mensajes$.asObservable();
  }

  async GuardarMensaje(texto: string, aula: "Aula-A" | "Aula-B") {
    if (!texto.trim()) return;

    const usuario = await supabase.auth.getUser();
    const email = usuario.data.user?.email ?? 'anonimo';

    await supabase.from('mensajes_chat').insert({
      mensaje: texto,
      usuario: email,
      aula: aula
    });
  }
}