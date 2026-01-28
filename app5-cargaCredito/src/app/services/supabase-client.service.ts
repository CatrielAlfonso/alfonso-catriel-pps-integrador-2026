import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export const supabase = createClient(
  environment.apiUrl,
  environment.publicAnonKey
);


@Injectable({
  providedIn: 'root',
})
export class SupabaseClientService {
  
}
