import * as React from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RoutePathEnum } from '@/routes/routerEnum';

const { Title, Paragraph } = Typography;
interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const nav = useNavigate();
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <div className=" text-center">
          <Title>Welcome to the Home Page</Title>
          <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份。</Paragraph>
          <div>
            <Button onClick={() => nav(RoutePathEnum.MANAGE_QUESTION_LIST)} type="primary">
              开始使用
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
