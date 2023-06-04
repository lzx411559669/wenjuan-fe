import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionInfoDefaultPropsType } from './interface';

export * from './interface';

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultPropsType,
};
