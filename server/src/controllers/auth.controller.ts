import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwt.secret';

import { UserEntity } from '../entities/user.entity';

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  const { email, userName } = req.body;
  const { ...data } = req.body;

  let user = await getRepository(UserEntity).findOne({ email });
  if(user) return res.status(400).json({
    message: 'Email already registered'
  })

  user = await getRepository(UserEntity).findOne({userName});
  if(user) return res.status(400).json({
    message: 'Username already exists'
  })

  const newUser = await getRepository(UserEntity).create(data);
  const result = await getRepository(UserEntity).save(newUser);

  return res.status(201).json(result);
}