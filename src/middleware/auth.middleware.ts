import {NextFunction, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {getRepository} from 'typeorm';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import User from "../applications/user/user.entity";

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  console.log('authMiddleware')
  if (request.headers?.authorization) {
    const {authorization} = request.headers;
    const userRepository = getRepository(User);
    if (authorization) {
      const secret = process.env.JWT_SECRET;
      try {
        const verificationResponse = jwt.verify(authorization, secret) as DataStoredInToken;
        const id = verificationResponse.id;
        const user = await userRepository.findOne(id);
        if (user) {
          request.user = user;
          next();
        } else {
          next(new WrongAuthenticationTokenException());
        }
      } catch (err) {
        next(new WrongAuthenticationTokenException());
      }
    } else {
      next(new AuthenticationTokenMissingException());
    }
  } else {
    const cookies = request.cookies;
    if (cookies && cookies.Authorization) {
      const userRepository = getRepository(User);
      const secret = process.env.JWT_SECRET;
      try {
        const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
        const id = verificationResponse.id;
        const user = await userRepository.findOne(id);
        if (user) {
          request.user = user;
          next();
        } else {
          next(new WrongAuthenticationTokenException());
        }
      } catch (error) {
        next(new WrongAuthenticationTokenException());
      }
    } else {
      next(new AuthenticationTokenMissingException());
    }
  }
}

export default authMiddleware;