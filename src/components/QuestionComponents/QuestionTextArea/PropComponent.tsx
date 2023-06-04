import * as React from 'react';
import { QuestionTextareaProps } from './interface';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

const PropComponent: React.FunctionComponent<QuestionTextareaProps> = (props) => {
  const { title, placeholder, onChange, disabled } = props;

  const [form] = useForm();

  React.useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);

  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ title, placeholder }}
        onValuesChange={handleValuesChange}
        disabled={disabled}
      >
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入' }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item label="Placeholder" name="placeholder">
          <Input></Input>
        </Form.Item>
      </Form>
    </>
  );
};

export default PropComponent;
