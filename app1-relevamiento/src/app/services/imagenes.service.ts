// imagenes.service.ts
import { Injectable, inject } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';


export interface IFotos {
  id?: string;
  foto: string;
  autor: string;
  categoria: string;
  fecha: string;
  hora: string;
  interacciones: number;
  reaccion_usuarios: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  
  private supabase: SupabaseClient;
  private storage = inject(FirestoreService);
  private authService = inject(AuthService);

  constructor() {
    this.supabase = createClient(
      environment.apiUrl,
      environment.publicAnonKey
    );
  }

  async guardarFoto(categoria: string): Promise<void> {
    const foto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 90,
      webUseInput: true
    });

    const now = new Date();
    const autor = await this.authService.ObtenerNombreUsuario();
    const path = `${categoria}/${autor}/${now.getTime()}.jpg`;
    const url = await this.storage.subirImagen(path, foto.dataUrl!);

    // if (error) {
    // console.error('❌ Error subiendo imagen:', error);
    // return;
    // }

    await this.supabase.from('fotos').insert({
      foto: url,
      autor: autor,
      categoria,
      fecha: now.toISOString().split('T')[0], 
      hora: now.toLocaleTimeString(),
      interacciones: 0,
      reaccion_usuarios: []
    });
  }

  async obtenerFotos(categoria: string): Promise<IFotos[]> {
    const { data } = await this.supabase
      .from('fotos')
      .select('*')
      .eq('categoria', categoria)
      .order('fecha', { ascending: false })
      .order('hora', { ascending: false });

    return data || [];
  }

  async votarFoto(id: string, usuario: string) {
    const { data } = await this.supabase
      .from('fotos')
      .select('interacciones, reaccion_usuarios')
      .eq('id', id)
      .single();

    if (!data || data.reaccion_usuarios.includes(usuario)) return;

    await this.supabase
      .from('fotos')
      .update({
        interacciones: data.interacciones + 1,
        reaccion_usuarios: [...data.reaccion_usuarios, usuario]
      })
      .eq('id', id);
  }

}
