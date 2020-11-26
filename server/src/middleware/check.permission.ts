import {
  Request,
  Response,
  NextFunction,
} from 'express';
import { getRepository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export const checkPermission = async (req:Request, res: Response, next: NextFunction) => {
  const userName = res.locals.jwtPayload.userName;
  try {
    const user = await getRepository(UserEntity).findOne({ userName });
    res.locals.user = user;
  } catch (error) {
    return res.status(403).json({
      message: 'UnAutorized access'
    })
  }
  next();
}