import { AuthUser } from '@server/types/user';
import { Router, Request, Response, NextFunction } from 'express';
import { userServices } from '../services';
import { getErrorResponse, getSuccessResponse, logger } from '../utils';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const userInfo = await userServices.createUser(req.body);
    if (userInfo) {
      return res
        .status(200)
        .json(getSuccessResponse(200, 'User Created', userInfo));
    } else {
      res.status(400).json(getErrorResponse(400, 'User Not Created'));
    }
  } catch(e) {
    res.status(400).json(getErrorResponse(400, 'User already exists!'));
  }
});

export const registerRouter = router;
