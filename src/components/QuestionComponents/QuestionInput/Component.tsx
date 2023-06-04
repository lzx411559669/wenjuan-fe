import { Input, Typography } from 'antd';
import * as React from 'react';
import { IQuestionInputProps, IQuestionInputPropsDefault } from './interface';
const { Paragraph } = Typography;

const QuestionTitle: React.FunctionComponent<IQuestionInputProps> = (props) => {
  const { title, placeholder } = { ...IQuestionInputPropsDefault, ...props };
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
