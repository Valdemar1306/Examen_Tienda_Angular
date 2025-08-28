export class Usuario {
    idUsuario:number;
    idUsuarioGuid:any;
    idTipoSesion:number;
    idRol:number;
    correo:string;
    apodo:string;
    password:string;
    nombre:string;
    apellidoPaterno:string;
    apellidoMaterno:string;
    idSite:number;
    idCampana:number;
    sexo:string;
    telefono:string;
    fechaNacimiento:Date;
    fechaCreacion:Date;
    fechaModificacion:Date;
    activo:boolean;
    acercaDe:string;

    jwtToken?: string;
}