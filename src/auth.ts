import jwt from 'jsonwebtoken'
import { jwtSecret } from './config';
import UserModel from './modules/user/UserModel';

export const getUser = async (token: string) => {
  if (!token) return null;

  const decodedToken = jwt.verify(token.substring(4), jwtSecret) as { id: string }

  const user = await UserModel.findOne({_id: decodedToken.id })

  if (!user) return null

  return user

}

export const generateJwtToken = (userId: string) => `JWT ${jwt.sign({ id: userId }, jwtSecret)}`
