import { getUserInfo } from '@/apis/userApis';
import useUserState from '@/store/user';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';

const useUserLoadData = () => {
  const [waitingUserData, setWaitingUserData] = useState(true);

  const [{ username }, userStateActions] = useUserState();

  const { data, run: getUserData } = useRequest(getUserInfo, {
    manual: true,
    onSuccess: (res) => {
      userStateActions.updateUser(res);
    },
    onFinally: () => {
      setWaitingUserData(false);
    },
  });

  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return;
    }
    getUserData(); //如果没有用户信息则请求
  }, [username]);

  return { waitingUserData };
};

export default useUserLoadData;
