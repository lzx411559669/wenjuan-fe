import QuestionInputConf, { IQuestionInputProps } from './QuestionInput';
import QuestionTitleConf, { QuestionTitilePropsType } from './QuestionTitle';
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph';
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo';
import QuestionTextareaConf, { QuestionTextareaProps } from './QuestionTextArea';
import QuestionRadioConf, { QuestionRadioPropsType } from './QuestionRadio';
import QuestionCheckboxConf, { QuestionCheckboxPropsType } from './QuestionCheckbox';

//各个组件的prop type
export type ComponentPropsType = QuestionTitilePropsType &
  IQuestionInputProps &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaProps &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType;

//统一，组件的配置
export type ComponentConfType = {
  title: string;
  type: string;
  PropComponent: React.FC<ComponentPropsType>;
  Component: React.FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};
//全部组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
];

//组件分组
export const componentConfGroup = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf, QuestionRadioConf, QuestionCheckboxConf],
  },
];
export function getComponentConfByType(type: string) {
  return componentConfList.find((item) => item.type === type);
}
