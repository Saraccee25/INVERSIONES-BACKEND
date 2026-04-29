import {Request, Response} from 'express';
import { getUsuariosService, createUsuarioService, getUsuarioByDocumentoService, updateUsuarioService} from '../services/usuario.service';
import {UsuarioSchema} from '../schemas/usuario.schema';


export const getUsuarios = async (req: Request, res: Response) => {
    try{
        const usuarios = await getUsuariosService();
        res.status(200).json(usuarios);
    }catch(error){
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
}

export const createUsuario = async (req: Request, res: Response) => {
    try{
       const validation = UsuarioSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Datos de usuario inválidos",
        errors: validation.error.flatten().fieldErrors,
      });
    }
        const usuario = await createUsuarioService(req.body);
        res.status(201).json(usuario);
    }catch(error){
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
}

export const getUsuarioByDocumento = async (req: Request<{ documento: string }>, res: Response) => {
    try{
        const  {documento}  = req.params; 
        const usuario = await getUsuarioByDocumentoService(documento);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    }catch(error){
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
}

export const updateUsuario = async (req: Request<{ documento: string }>, res: Response) => {
    try{
        const { documento } = req.params;
        const validation = UsuarioSchema.partial().safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Datos de usuario inválidos",
                errors: validation.error.flatten().fieldErrors,
            });
        }
        const usuario = await updateUsuarioService(documento, req.body);
        res.status(200).json(usuario);
    }catch(error){
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
}