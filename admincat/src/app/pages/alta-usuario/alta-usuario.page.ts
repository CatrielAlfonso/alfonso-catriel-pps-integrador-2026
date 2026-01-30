import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder,Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthService } from 'src/app/services/auth.service';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import emailjs from '@emailjs/browser';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { CustomLoader } from 'src/app/services/custom-loader.service';
import { ToastController } from '@ionic/angular';

const supabase = createClient(
  environment.apiUrl,
  environment.publicAnonKey,
  {
    auth: {
      persistSession: false, // <--- ESTO evita que el Admin sea deslogueado
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  }
);

interface UsuarioForm {
  nombres: FormControl<string>;
  apellidos: FormControl<string>;
  dni: FormControl<string>;
  correo: FormControl<string>;
  clave: FormControl<string>;
  reClave: FormControl<string>;
  foto: FormControl<File | null>;
}

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.page.html',
  styleUrls: ['./alta-usuario.page.scss'],
  imports: [ FormsModule, IonicModule,CommonModule, ReactiveFormsModule]
})
export class AltaUsuarioPage implements OnInit {

  usuarioForm: FormGroup;
  mensajeError: string = '';
  mensajeExito: string = '';
  perfilLogueado: string = 'admin'; // Esto deberías obtenerlo de tu AuthService
  listaUsuarios: any[] = [];
  fotoPreview: string | null = null;
  archivoFoto: File | null = null; // Para el upload real
subiendoDatos: boolean = false;
  

  constructor(private fb: FormBuilder, private sb: AuthService, private router: Router, private loader: CustomLoader,private toastCtrl: ToastController) 
  {
   this.usuarioForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,8}$')]],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      reClave: ['', [Validators.required]],
      foto: [null, [Validators.required]]
    }, { validators: this.passwordMatchValidator });

  }

  async ngOnInit() {
    const mail = await this.sb.getMailUsuario();
    this.perfilLogueado = (mail === 'admin@admin.com') ? 'admin' : 'cliente';
    //  this.usuarioForm = new FormGroup<UsuarioForm>({
    //   nombres: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    //   apellidos: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    //   dni: new FormControl('', {
    //     nonNullable: true,
    //     validators: [
    //       Validators.required,
    //       Validators.pattern('^[0-9]{7,8}$')
    //     ]
    //   }),
    //   correo: new FormControl('', {
    //     nonNullable: true,
    //     validators: [Validators.required, Validators.email]
    //   }),
    //   clave: new FormControl('', {
    //     nonNullable: true,
    //     validators: [Validators.required, Validators.minLength(6)]
    //   }),
    //   reClave: new FormControl('', {
    //     nonNullable: true,
    //     validators: [Validators.required]
    //   }),
    //   foto: new FormControl<File | null>(null, Validators.required)
    // }, { validators: this.passwordMatchValidator });
  }


//  passwordMatchValidator: ValidatorFn = (
//   control: AbstractControl
//   ): ValidationErrors | null => {

//     const form = control as FormGroup;

//     const clave = form.get('clave')?.value;
//     const reClave = form.get('reClave')?.value;

//     if (!clave || !reClave) return null;

//     return clave === reClave ? null : { passwordMismatch: true };
//   };
  
  // Validador: Clave == ReClave
  // passwordMatchValidator(g: FormGroup) {
  //   return g.get('clave')?.value === g.get('reClave')?.value
  //     ? null : { 'mismatch': true };
  // }


  // Método para mostrar avisos estilo "Comando"
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: 'top',
      cssClass: 'custom-toast' // Puedes darle estilo en el SCSS
    });
    toast.present();
  }

  async guardarUsuario() {
    if (this.usuarioForm.invalid) {
      this.mensajeError = 'Complete todos los campos correctamente';
      return;
    }

    const data = this.usuarioForm.getRawValue();

    console.log('Usuario a guardar:', data);

    this.mensajeExito = 'Usuario creado correctamente';
    this.usuarioForm.reset();
  }

  async cargarUsuarios() {
    const { data, error } = await supabase
      .from('usuarios_admincat')
      .select('*')
      .order('apellidos', { ascending: true });
    if (data) this.listaUsuarios = data;
  }

  async escanearDNI() {
    const result = await BarcodeScanner.scan();
    if (result.barcodes.length > 0) {
      const rawData = result.barcodes[0].displayValue;
      const datos = rawData.split('@');

      // El DNI argentino tiene los datos en posiciones fijas separadas por @
      if (datos.length > 7) {
        this.usuarioForm.patchValue({
          apellidos: datos[1].trim(),
          nombres: datos[2].trim(),
          dni: datos[4].trim()
        });
      }
    }
  }


async registrar() {
  if (this.usuarioForm.invalid || !this.archivoFoto) {
    this.usuarioForm.markAllAsTouched();
    this.mostrarToast("⚠️ DATOS INCOMPLETOS", "danger");
    return;
  }

  this.subiendoDatos = true;
  this.loader.show("INICIANDO PROTOCOLO DE ALTA...");
  const { nombres, apellidos, dni, correo, clave } = this.usuarioForm.value;

  try {
    // 1. CREAR USUARIO EN SUPABASE AUTH (Para que no falle la Foreign Key)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: correo,
      password: clave,
    });

    if (authError) throw new Error("Error en Auth: " + authError.message);

    // 2. SUBIR IMAGEN
    const nombreArchivo = `perfil_${dni}_${Date.now()}.jpg`;
    const { error: upErr } = await supabase.storage
      .from('imagenes-usuarios')
      .upload(nombreArchivo, this.archivoFoto);

    if (upErr) throw upErr;

    const { data: urlData } = supabase.storage
      .from('imagenes-usuarios')
      .getPublicUrl(nombreArchivo);

    // 3. GUARDAR EN TABLA (Usando foto_url como dijiste)
    const objetoUsuario = {
      id: authData.user?.id, // <--- ESTO vincula con la Foreign Key
      nombres: nombres,
      apellidos: apellidos,
      dni: dni,
      correo: correo,
      clave: clave,
      foto_url: urlData.publicUrl, // <--- Nombre exacto de tu columna
      perfil: 'cliente'
    };

    const { error: dbError } = await supabase
      .from('usuarios_admincat')
      .insert([objetoUsuario]);

    if (dbError) throw dbError;

    // 4. ENVIAR EMAIL (Asegúrate que en EmailJS uses {{to_email}})
    await this.enviarEmail(objetoUsuario);
    
    this.mostrarToast("✅ RECLUTA REGISTRADO EXITOSAMENTE", "success");
    this.usuarioForm.reset();
    this.fotoPreview = null;

  } catch (error: any) {
    console.error(error);
    this.mostrarToast("❌ ERROR: USUARIO YA REGISTRADO" , "danger");
  } finally {
    this.loader.hide();
    this.subiendoDatos = false;
  }
}

  passwordMatchValidator(form: AbstractControl) {
    const clave = form.get('clave')?.value;
    const reClave = form.get('reClave')?.value;
    return clave === reClave ? null : { mismatch: true };
  }
  

  // AJUSTE EN EMAILJS
  async enviarEmail(datos: any) {
  try {
    const templateParams = {
      to_name: `${datos.nombres} ${datos.apellidos}`,
      to_email: datos.correo, // <--- VERIFICA: ¿En tu plantilla de EmailJS dice {{to_email}}?
      message: 'Tu cuenta en AdminCat ha sido activada con éxito.',
      // Agregamos el correo explícitamente para evitar el error 422
      //reply_to: 'admin@admincat.com' 
    };

      await emailjs.send(
        environment.serviceId,
        environment.templateId,
        templateParams,
        environment.plublicKey
      );
      this.mostrarToast("📧 EMAIL DE BIENVENIDA ENVIADO", "success");
    } catch (e) {
      console.error("Error EmailJS:", e);
      this.mostrarToast("⚠️ USUARIO CREADO, PERO FALLÓ EL ENVÍO DE EMAIL", "warning");
    }
  }
volver() {
  // Esto te lleva a la pantalla anterior sin refrescar la app
  this.router.navigateByUrl('/principal'); 
}
onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.archivoFoto = file;
    const reader = new FileReader();
    reader.onload = () => { this.fotoPreview = reader.result as string; };
    reader.readAsDataURL(file);

    // ESTO ES CLAVE: Informa al formulario que ya hay una foto para que deje de ser 'invalid'
    this.usuarioForm.get('foto')?.setValue(file);
    this.usuarioForm.get('foto')?.updateValueAndValidity();
  }
}

}
