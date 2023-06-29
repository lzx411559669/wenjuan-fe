export type OptionType = {
  value: string;
  label: string;
  checked: boolean;
};

export type QuestionCheckboxPropsType = {
  title?: string;
  isVertical?: boolean;
  list?: OptionType[];
  onChange?: (newProps: QuestionCheckboxPropsType) => void;
  disabled?: boolean;
};

export type QuestionCheckboxStatPropsType = {
  stat: Array<{
    name: string,
    count: number
  }>
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  list: [
    {
      value: '选项1',
      label: '选项1',
      checked: false,
    },
    {
      value: '选项2',
      label: '选项2',
      checked: true,
    },
    {
      value: '选项3',
      label: '选项3',
      checked: false,
    },
  ],
};
