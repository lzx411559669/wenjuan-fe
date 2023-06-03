/**
 * 问卷 标题组件
 */
import Component from './Component';
import PropComponent from './PropComponent';
import { QuestionTitleDefaultProps } from './interface';
export * from './interface';

//title组件配置
export default {
  title: '标题',
  type: 'questionTitle',
  Component, //画布显示的组件
  PropComponent, //修改属性的组件
  defaultProps: QuestionTitleDefaultProps,
};
