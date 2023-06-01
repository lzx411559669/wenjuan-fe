import { Get, Post } from '@/utils/http';

export enum UserApi {
  baseUrl = '/api/user',
}

export type User = {
  username: string;
  password: string;
  nickname: string;
};

export const getUserInfo = async () => {
  const res = await Get<User>(UserApi.baseUrl, {});
  return res;
};

export const register = async (body: User) => {
  const res = await Post(`${UserApi.baseUrl}/register`, {}, body);
  return res;
};

export const login = async (body: Pick<User, 'username' | 'password'>) => {
  const res = await Post(UserApi.baseUrl + '/login', {}, body);
  return res;
};
