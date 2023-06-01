import Mock from 'mockjs';

const Random = Mock.Random;
const accessTokens = {
  admin: 'admin-accessToken',
  editor: 'editor-accessToken',
  test: 'test-accessToken',
};

const userList: any[] = [];
export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: (config) => {
      const { username } = config.body;
      const accessToken = accessTokens[username];
      if (!accessToken) {
        return {
          code: 200,
          messages: '登录成功',
          data: {
            token: Random.word(20),
          },
        };
      }
      return {
        code: 200,
        messages: 'success',
        data: {
          accessToken,
        },
      };
    },
  },
  {
    url: '/api/user',
    method: 'get',
    response(config) {
      console.log('🚀 ~ file: user.ts:40 ~ response ~ config:', config);
      return {
        code: 200,
        messages: 'success',
        data: {
          username: Random.title(),
          nickname: Random.cname(),
        },
      };
    },
  },
  {
    url: '/api/user/register',
    method: 'post',
    response(config) {
      const { body } = config;
      userList.push(body);
      console.log('userList', userList);
      return {
        code: 200,
        messages: 'success',
        data: body,
      };
    },
  },
];
