/**
 * 问卷段落组件
 */
import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionPrargraphDefaultProps } from './interface';

export * from './interface';

export default {
  title: '段落',
  type: 'questionParagraph',
  Component,
  PropComponent,
  defaultProps: QuestionPrargraphDefaultProps,
};
