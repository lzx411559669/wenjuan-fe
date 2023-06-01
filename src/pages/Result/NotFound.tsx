import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const nav = useNavigate();

const NotFount: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button onClick={() => nav(-1)} type="primary">
        返回
      </Button>
    }
  />
);

export default NotFount;
