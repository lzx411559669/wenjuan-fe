import { Input, Typography } from 'antd';
import * as React from 'react';
import { IQuestionTitleProps, IQuestionTitlePropsDefault } from './interface';
const { Paragraph } = Typography;

const QuestionTitle: React.FunctionComponent<IQuestionTitleProps> = (props) => {
  const { title, placeholder } = { ...IQuestionTitlePropsDefault, ...props };
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </>
  );
};

export default QuestionTitle;
