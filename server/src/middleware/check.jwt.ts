import {
  Request,
  Response,
  NextFunction
} from 'express';
import * as jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwt.secret';

export const checkJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = <string>req.headers['authorization'];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, jwtSecret.JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    return res.status(403).json({
      message: 'UnAuthorized access detected'
    })
  }

  const {userName} = jwtPayload;
  const newToken = jwt.sign(
    {userName},
    jwtSecret.JWT_SECRET,
    {expiresIn: '1d'}
  );

  res.setHeader('authorization', newToken);
  next();
}