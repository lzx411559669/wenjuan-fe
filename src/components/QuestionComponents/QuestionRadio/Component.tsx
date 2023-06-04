import * as React from 'react';
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from './interface';
import { Radio, Space, Typography } from 'antd';
const { Paragraph } = Typography;

const Component: React.FunctionComponent<QuestionRadioPropsType> = (props) => {
  const { title, options, value, isVertical } = { ...QuestionRadioDefaultProps, ...props };

  return (
    <>
      <Paragraph>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options?.map((item, index) => {
            return (
              <Radio value={item.value} key={item.value}>
                {item.label}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </>
  );
};

export default Component;
