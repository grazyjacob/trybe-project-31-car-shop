import { NextFunction, Request, Response, Router } from 'express';
import CarsPostController from '../Controllers/CarsPostController';

const router = Router();

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => new 
  CarsPostController(req, res, next).create(),
);

export default router;