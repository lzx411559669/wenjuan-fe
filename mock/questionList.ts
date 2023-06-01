import { IQuestionCard } from '../src/interface/question.moudule';
import Mock from 'mockjs';
import { MockMethod, MethodType } from 'vite-plugin-mock';

const questionList: IQuestionCard[] = [];

const questionData: any = Mock.mock({
  'list|5-20': [
    {
      '_id|+1': 1,
      title: '@ctitle(10)',
      isPublish: '@boolean',
      isStar: '@boolean',
      answerCount: '@natural(0, 100)',
      createAt: '@date("yyyy-MM-dd")',
      isDelete: '@boolean',
    },
  ],
});

export default [
  {
    url: '/api/questionList',
    method: 'get',
    response(options) {
      const keyword = options.query.keyword;
      const isStart = options.query.isStart;
      const isPublish = options.query.isPublish;
      const isDelete = options.query.isDelete;
      const page = options.query.page ?? 1;
      const pageSize = options.query.pageSize ?? 10;
      const list = questionData.list
        .filter((item: any) => {
          if (keyword) {
            return item.title.includes(keyword);
          }
          if (isStart) {
            return item.isStart;
          }
          if (isPublish) {
            return item.isPublish;
          }
          if (isDelete) {
            return item.isDelete;
          }
          return true && !item.isDelete;
        })
        .slice(pageSize * (page - 1), pageSize * page);
      return {
        code: 200,
        messages: 'success',
        data: {
          list,
          total: list.length,
        },
      };
    },
  },
  {
    url: '/api/question',
    method: 'post',
    response(options) {
      const { body } = options;
      console.log('🚀 ~ file: questionList.ts:63 ~ response ~ options:', options);
      questionData.list.push(body);
      return {
        code: 200,
        messages: 'success',
        data: body,
      };
    },
  },
  {
    url: '/api/question/:id',
    method: 'put',
    response(options) {
      const { body } = options;
      const { id } = options.query;
      const index = questionData.list.findIndex((item: any) => item._id == id);
      const temp = questionData.list[index];
      questionData.list[index] = {
        ...temp,
        ...body,
      };

      return {
        code: 200,
        messages: 'success',
        data: body,
      };
    },
  },
  {
    url: '/api/question/duplicate/:id',
    method: 'post',
    response(options) {
      const { id } = options.query;
      const index = questionData.list.findIndex((item: any) => item._id == id);
      const temp = questionData.list[index];
      const newId = Mock.mock(`@natural(${questionData.list.length + 1}, 1000)`);
      questionData.list.push({
        ...temp,
        _id: newId,
      });

      return {
        code: 200,
        messages: 'success',
        data: newId,
      };
    },
  },
  {
    url: '/api/question/del/:id',
    method: 'delete',
    response(options) {
      const { id } = options.query;
      const index = questionData.list.findIndex((item: any) => item._id == id);
      const temp = questionData.list[index];
      questionData.list[index] = {
        ...temp,
        isDelete: true,
      };
      return {
        code: 200,
        messages: 'success',
        data: '1',
      };
    },
  },
  {
    url: '/api/question/recover',
    method: 'post',
    response(options) {
      const { body } = options;
      const ids = body;
      questionData.list.forEach((element) => {
        if (ids.includes(element._id)) {
          element.isDelete = false;
        }
      });
      return {
        code: 200,
        messages: 'success',
        data: [],
      };
    },
  },
  {
    url: '/api/question/del',
    method: 'post',
    response(options) {
      const { body } = options;
      const ids = body;
      questionData.list = questionData.list.filter((item: any) => !ids.includes(item._id));
      return {
        code: 200,
        messages: 'success',
        data: ids,
      };
    },
  },
] as MockMethod[];
