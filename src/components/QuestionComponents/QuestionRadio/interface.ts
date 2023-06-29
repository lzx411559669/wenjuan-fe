export type OptionType = {
  label: string;
  value: string;
};

export type QuestionRadioPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: Array<OptionType>;
  value?: string;
  onChange?: (newProps: QuestionRadioPropsType) => void;
  disabled?: boolean;
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    {
      label: '选项1',
      value: 'item1',
    },
    {
      label: '选项2',
      value: 'item2',
    },
  ],
  value: '',
};


//统计组件的属性类型
export type QuestionRadioStatPropsType = {
  stat: Array<{
    name:string,count:number
  }>
}