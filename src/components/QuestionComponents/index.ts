import QuestionInputConf, { IQuestionTitleProps } from './QuestionInput';
import QuestionTitleConf, { QuestionTitilePropsType } from './QuestionTitle';

//各个组件的prop type
export type ComponentPropsType = QuestionTitilePropsType & IQuestionTitleProps;

//统一，组件的配置
export type ComponentConfType = {
  title: string;
  type: string;
  Component: React.FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf];

export function getComponentConfByType(type: string) {
  return componentConfList.find((item) => item.type === type);
}
