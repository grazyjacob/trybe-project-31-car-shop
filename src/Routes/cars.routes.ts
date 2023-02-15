import { NextFunction, Request, Response, Router } from 'express';
import CarsController from '../Controllers/CarsController';

const router = Router();

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => new 
  CarsController(req, res, next).create(),
);
router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => new 
  CarsController(req, res, next).findAll(),
);

router.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => new 
  CarsController(req, res, next).findOne(),
);

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => new 
  CarsController(req, res, next).updateOne(),
);

export default router;