import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { supabase } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ListadoUsuariosPage implements OnInit {
  usuarios: any[] = [];
  cargando: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  async obtenerUsuarios() {
    this.cargando = true;
    try {
      // Traemos todos los usuarios de la tabla usuarios_admincat
      const { data, error } = await supabase
        .from('usuarios_admincat')
        .select('*')
        .order('nombres', { ascending: true });

      if (error) throw error;
      this.usuarios = data || [];
    } catch (error) {
      console.error('Error al obtener reclutas:', error);
    } finally {
      this.cargando = false;
    }
  }

  volver() {
    this.router.navigateByUrl('/principal');
  }
}