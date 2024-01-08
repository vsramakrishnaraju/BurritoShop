// routes/burrito.routes.ts
import { Router } from 'express';
import * as BurritoController from '../controllers/BurritoController';

const router = Router();

router.get('/', BurritoController.getAllBurritos);
router.post('/', BurritoController.createBurrito);
router.get('/:id', BurritoController.getBurritoById);


// Define additional routes for update, delete, get by ID

export default router;
