export class Creditos {
    usuario:string="";
    credito:number=0;
    id: number=-1;
    codigo: string="";
    cargo10: number = 0;
    cargo50:number = 0;
    cargo100:number = 0;

  constructor(id?: number, usuario?: string) {
    if (id !== undefined) this.id = id;
    if (usuario !== undefined) this.usuario = usuario;
  } 
  
 }