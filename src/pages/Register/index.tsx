import MainLayout from '@/sections/Layouts/MainLayout';
import * as React from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { Space, Typography, Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePathEnum } from '@/routes/routerEnum';
import { useRequest } from 'ahooks';
import { register } from '@/apis/userApis';

const { Title } = Typography;
interface IRegisterProps {}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const nav = useNavigate();
  const { run: registerUser, loading } = useRequest(async (values) => await register(values), {
    manual: true,
    onSuccess: () => {
      message.success('注册成功');
      nav(RoutePathEnum.LOGIN);
    },
  });

  const onFinish = (values: any) => {
    const { usename, password, nickname } = values;
    registerUser({ usename, password, nickname });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <div className="">
          <div className=" text-center">
            <Space>
              <Title>
                <UserAddOutlined />
              </Title>
              <Title>注册新用户</Title>
            </Space>
          </div>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            style={{ maxWidth: 800, width: 500 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
                { type: 'string', min: 6, max: 20, message: '长度6-20位字符' },
                { pattern: /^\w+$/, message: '只能是字数和下划线' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="确认密码"
              name="confirmPassword"
              dependencies={['password']} //依赖password，password变化会重新触发validator
              rules={[
                { required: true, message: 'Please input your confirmPassword!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) return Promise.resolve();
                    return Promise.reject(new Error('两次密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="昵称"
              name="nickname"
              rules={[{ required: true, message: 'Please input your nickname!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <div className="mt-4">
                <Link to={RoutePathEnum.LOGIN}>已有账户，去登录</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
