import Component from './Component';
import PropComponent from './PropComponent';
import { IQuestionTitlePropsDefault } from './interface';

export * from './interface';

export default {
  title: '输入框',
  type: 'questionInput',
  Component,
  PropComponent,
  defaultProps: IQuestionTitlePropsDefault,
};
