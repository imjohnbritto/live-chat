import { AuthUser } from '@server/types/user';
import { Router, Request, Response, NextFunction } from 'express';
import { userServices } from '../services';
import { getErrorResponse, getSuccessResponse, logger } from '../utils';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const login = await userServices.login(req.body);
    if (login) {
      return res
        .status(200)
        .json(getSuccessResponse(200, 'Login successful', login));
    } else {
      res.status(401).json(getErrorResponse(401, 'User Not Found'));
    }
});

export const loginRouter = router;
