import { NextFunction, Request, Response, Router } from 'express';
import MotorcyclesController from '../Controllers/MotorcyclesController';

const router = Router();

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => new 
  MotorcyclesController(req, res, next).create(),
);
router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => new 
  MotorcyclesController(req, res, next).findAll(),
);
router.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => new 
  MotorcyclesController(req, res, next).findOne(),
);

export default router;