export interface IQuestionTitleProps {
  title?: string;
  placeholder?: string;
  onChange?: (newProps: IQuestionTitleProps) => void;
  disabled?: boolean;
}

export const IQuestionTitlePropsDefault: IQuestionTitleProps = {
  title: '输入框标题',
  placeholder: '请输入',
};
