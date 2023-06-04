import * as React from 'react';
import { QuestionInfoDefaultPropsType, QuestionInfoPropsType } from './interface';
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

const Component: React.FunctionComponent<QuestionInfoPropsType> = (props) => {
  const { title, desc } = { ...QuestionInfoDefaultPropsType, ...props };
  return (
    <>
      <Title style={{ fontSize: '24px', textAlign: 'center' }}>{title}</Title>
      <Paragraph style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{desc}</Paragraph>
    </>
  );
};

export default Component;
