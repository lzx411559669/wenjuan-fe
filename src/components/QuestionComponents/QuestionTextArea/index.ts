import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionTextareaPropsDefault } from './interface';

export * from './interface';

export default {
  title: '多行输入框',
  type: 'questionTextarea',
  Component,
  PropComponent,
  defaultProps: QuestionTextareaPropsDefault,
};
