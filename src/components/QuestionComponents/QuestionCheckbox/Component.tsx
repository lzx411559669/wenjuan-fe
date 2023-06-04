import * as React from 'react';
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface';
import { Checkbox, Space, Typography } from 'antd';
const { Paragraph } = Typography;

const Component: React.FunctionComponent<QuestionCheckboxPropsType> = (props) => {
  const { title, list, isVertical } = { ...QuestionCheckboxDefaultProps, ...props };
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {list?.map &&
            list.map((opt) => {
              const { label, value, checked } = opt;
              return (
                <Checkbox key={value} value={value} checked={checked}>
                  {label}
                </Checkbox>
              );
            })}
        </Space>
      </div>
    </>
  );
};

export default Component;
