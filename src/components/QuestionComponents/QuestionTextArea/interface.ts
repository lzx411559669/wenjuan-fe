export interface QuestionTextareaProps {
  title?: string;
  placeholder?: string;
  onChange?: (newProps: QuestionTextareaProps) => void;
  disabled?: boolean;
}

export const QuestionTextareaPropsDefault: QuestionTextareaProps = {
  title: '多行输入框标题',
  placeholder: '请输入',
};
