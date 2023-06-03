import * as React from 'react';
import { QuestionTitilePropsType } from './interface';
import { Checkbox, Form, Input, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
const PropComponent: React.FunctionComponent<QuestionTitilePropsType> = (props) => {
  const { text, level, isCenter, onChange, disabled } = props;

  const [form] = useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      text,
      level,
      isCenter,
    });
  }, [text, level, isCenter]);

  const handlerValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handlerValueChange}
        initialValues={{ text, level, isCenter }}
        disabled={disabled}
      >
        <Form.Item
          label="标题内容"
          name="text"
          rules={[{ required: true, message: '请输入标题内容' }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item label="层级" name="level">
          <Select
            options={[
              { label: 1, value: 1 },
              { label: 2, value: 2 },
              { label: 3, value: 3 },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item name="isCenter" valuePropName="checked">
          <Checkbox>居中显示</Checkbox>
        </Form.Item>
      </Form>
    </>
  );
};

export default PropComponent;
