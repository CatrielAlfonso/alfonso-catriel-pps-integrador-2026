// storage.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.apiUrl,
      environment.publicAnonKey
    );
  }

  async subirImagen(path: string, base64: string): Promise<string> {
    const file = this.base64ToFile(base64);

    const { error } = await this.supabase.storage
      .from('relevamiento')
      .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data } = this.supabase.storage
      .from('relevamiento')
      .getPublicUrl(path);

    return data.publicUrl;
  }

  private base64ToFile(base64: string): File {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], 'foto.jpg', { type: mime });
  }

  
}
