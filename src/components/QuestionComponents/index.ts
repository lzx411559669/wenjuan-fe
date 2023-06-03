import QuestionInputConf, { IQuestionTitleProps } from './QuestionInput';
import QuestionTitleConf, { QuestionTitilePropsType } from './QuestionTitle';

//各个组件的prop type
export type ComponentPropsType = QuestionTitilePropsType & IQuestionTitleProps;

//统一，组件的配置
export type ComponentConfType = {
  title: string;
  type: string;
  PropComponent: React.FC<ComponentPropsType>;
  Component: React.FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};
//全部组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf];

//组件分组
export const componentConfGroup = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
];
export function getComponentConfByType(type: string) {
  return componentConfList.find((item) => item.type === type);
}
