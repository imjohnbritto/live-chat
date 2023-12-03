import { AuthUser } from '@server/types/user';
import { Router, Request, Response, NextFunction } from 'express';
import { userServices } from '../services';
import { getErrorResponse, getSuccessResponse, logger } from '../utils';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const usersList = await userServices.getUsers();
    if (usersList) {
      return res
        .status(200)
        .json(getSuccessResponse(200, 'Users List', usersList));
    } else {
      res.status(401).json(getErrorResponse(401, 'User Not Found'));
    }
});

export const usersRouter = router;
