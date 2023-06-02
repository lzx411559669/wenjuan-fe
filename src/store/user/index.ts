import { User } from '@/apis/userApis';
import { atom, useRecoilState } from 'recoil';

export type Actions = {
  clearUser: () => void;
  updateUser: (user: User) => void;
  [key: string]: any;
};

const userState = atom({
  key: 'userState',
  default: {} as User,
});

const useUserState = (): [User, Actions] => {
  const [user, setUser] = useRecoilState(userState);

  const clearUser = () => {
    setUser({} as User);
  };

  const updateUser = (user: User) => {
    setUser(user);
  };

  return [user, { updateUser, clearUser }];
};

export default useUserState;
