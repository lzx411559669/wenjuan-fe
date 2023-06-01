import * as React from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { Space, Typography, Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePathEnum } from '@/routes/routerEnum';
import { useRequest } from 'ahooks';
import { login } from '@/apis/userApis';
import { setToken } from '@/utils/userToken';

const { Title } = Typography;
interface ILoginProps {}

const USERNAME_KEY = 'username';
const PASSWORD_KEY = 'password';

const remember = (userName: string, password: string) => {
  localStorage.setItem(USERNAME_KEY, userName);
  localStorage.setItem(PASSWORD_KEY, password);
};

const del = () => {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
};

const getUserInfo = () => {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
};

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const nav = useNavigate();
  const { run: loginHandler } = useRequest(async (values) => await login(values), {
    manual: true,
    onSuccess: (data) => {
      const { token } = data as any;
      setToken(token);
      message.success('登录成功');
      nav(RoutePathEnum.MANAGE_QUESTION_LIST);
    },
  });

  const onFinish = (values: any) => {
    if (values.remember) {
      remember(values.username, values.password);
    } else {
      del();
    }
    loginHandler(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();

  React.useEffect(() => {
    const { username, password } = getUserInfo();
    form.setFieldsValue({ username, password });
  }, []);
  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <div className=" text-center">
          <Space>
            <Title>
              <UserAddOutlined />
            </Title>
            <Title>登录用户</Title>
          </Space>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            style={{ maxWidth: 800, width: 500 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
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
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
            <div>
              <Link to={RoutePathEnum.REGISTER}>没有账户，去注册</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
