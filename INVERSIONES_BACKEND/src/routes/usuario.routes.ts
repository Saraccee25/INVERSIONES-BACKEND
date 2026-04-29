import {Router} from 'express';
import { getUsuarios, createUsuario, getUsuarioByDocumento, updateUsuario } from '../controllers/usuario.controller';

const router = Router();

router.get('/', getUsuarios);
router.post('/', createUsuario);
router.put('/:documento', updateUsuario);
router.get('/:documento', getUsuarioByDocumento);


export default router;