import Mock from 'mockjs';

import { componentList } from './questionList'
const questonValues = Array.from({ length: 10 }).map((item, index) => index)

const Random = Mock.Random
export default [
  {
    url: '/api/stat/:questionId',
    method: 'post',
    response(config) {
      const { body } = config;
      return {
        code: 200,
        messages: 'success',
        data: {
          total: 100,
          list: questonValues.map(index => {
            const values = componentList.reduce((pre, cur) => {
              return {
                ...pre,
                [cur.fe_id]: getValue(cur)
              }
            }, {})
            return {
              _id: Random.id(),
              ...values
            }
          })
        },
      };
    },
  },
  //获取单个组件的统计汇总
  {
    url: '/api/stat/:questionId/:componentId',
    method: 'get',
    response(config) {
      const { body } = config;
      return {
        code: 200,
        messages: 'success',
        data: {
          stat: [
            {
              name: '选项1', count: 20
            },
            {
              name: '选项2', count: 20
            },
            {
              name: '选项3', count: 30
            },
            {
              name: '选项4', count: 30
            },
          ]
        },
      };
    },
  },
];

const getValue = (component) => {
  const { type, props } = component
  switch (type) {
    case "questionTitle":
      return undefined
    case "questionInput":
      return Random.ctitle()
    case "questionCheckbox":
      return props.options[0].value
    case "questionTextarea":
      return Random.ctitle()
    case "questionRadio":
      return props.options[0].value
    default:
      return Random.ctitle()
  }
}