import * as React from 'react';
import { QuestionParagraphPropsType, QuestionPrargraphDefaultProps } from './interface';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const Component: React.FunctionComponent<QuestionParagraphPropsType> = (props) => {
  const { text, isCenter } = { ...QuestionPrargraphDefaultProps, ...props };
  return (
    <>
      <Paragraph
        style={{ textAlign: isCenter ? 'center' : 'left', marginBottom: 0, whiteSpace: 'pre-line' }}
      >
        {text}
      </Paragraph>
    </>
  );
};

export default Component;
