import { getUserInfo } from '@/apis/userApis';
import { RoutePathEnum } from '@/routes/routerEnum';
import { removeToken } from '@/utils/userToken';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserInfo: React.FunctionComponent = (props) => {
  const nav = useNavigate();
  const { data } = useRequest(getUserInfo);

  const { username, nickname } = data || {};

  const logout = () => {
    removeToken();
    nav(RoutePathEnum.LOGIN);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button type="link" onClick={logout}>
          退出登录
        </Button>
      ),
    },
  ];

  const UserInfo = (
    <Dropdown menu={{ items }} placement="bottom" arrow>
      <Space>
        <span>
          <UserOutlined></UserOutlined>
          <span className="ml-1"> {nickname}</span>
        </span>
        <DownOutlined />
      </Space>
    </Dropdown>
  );

  return <>{username ? UserInfo : <Link to={RoutePathEnum.LOGIN}>登录</Link>}</>;
};

export default UserInfo;
