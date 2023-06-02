import * as React from 'react';
import { Typography } from 'antd';
import { QuestionTitilePropsType, QuestionTitleDefaultProps } from './interface';
const { Title } = Typography;

const QuestionTitle: React.FunctionComponent<QuestionTitilePropsType> = (props) => {
  const { text, level, isCenter } = { ...QuestionTitleDefaultProps, ...props };
  return (
    <Title className={isCenter ? ' text-center' : ' text-start'} level={level}>
      {text}
    </Title>
  );
};

export default QuestionTitle;
