export interface IQuestionInputProps {
  title?: string;
  placeholder?: string;
  onChange?: (newProps: IQuestionInputProps) => void;
  disabled?: boolean;
}

export const IQuestionInputPropsDefault: IQuestionInputProps = {
  title: '输入框标题',
  placeholder: '请输入',
};
