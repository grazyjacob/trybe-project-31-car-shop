import { NextFunction, Request, Response, Router } from 'express';
import MotorcyclesController from '../Controllers/MotorcyclesController';

const router = Router();

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => new 
  MotorcyclesController(req, res, next).create(),
);

export default router;