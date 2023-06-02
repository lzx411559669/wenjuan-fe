import { RoutePathEnum } from '@/routes/routerEnum';
import useUserState from '@/store/user';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const isLoginOrRegisterPage = (pathname: RoutePathEnum) => {
  return [RoutePathEnum.LOGIN, RoutePathEnum.REGISTER].includes(pathname);
};

const isNotNeedLoginPage = (pathname: RoutePathEnum) => {
  return [RoutePathEnum.HOME, RoutePathEnum.LOGIN, RoutePathEnum.REGISTER].includes(pathname);
};

const useNavPage = (waitingUserData: boolean) => {
  const [{ username }] = useUserState();

  const nav = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    if (waitingUserData) return;
    //如果登录了
    if (username) {
      //如果是登录注册页，自动跳转到列表页
      if (isLoginOrRegisterPage(pathname as RoutePathEnum)) {
        nav(RoutePathEnum.MANAGE_QUESTION_LIST);
      }
      return;
    }
    //未登录
    if (isNotNeedLoginPage(pathname as RoutePathEnum)) {
      return;
    } else {
      nav(RoutePathEnum.LOGIN);
    }
  }, [waitingUserData, username, pathname]);
};

export default useNavPage;
