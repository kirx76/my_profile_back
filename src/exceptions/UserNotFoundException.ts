import HttpException from './HttpException';

export default class UserNotFoundException extends HttpException {
  constructor(userName: string) {
    super(404, `User with user name: ${userName} not founded`);
  }
}