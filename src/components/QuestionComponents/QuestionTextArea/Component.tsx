import { Input, Typography } from 'antd';
import * as React from 'react';
import { QuestionTextareaProps, QuestionTextareaPropsDefault } from './interface';
const { Paragraph } = Typography;

const { TextArea } = Input;

const QuestionTitle: React.FunctionComponent<QuestionTextareaProps> = (props) => {
  const { title, placeholder } = { ...QuestionTextareaPropsDefault, ...props };
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </>
  );
};

export default QuestionTitle;
