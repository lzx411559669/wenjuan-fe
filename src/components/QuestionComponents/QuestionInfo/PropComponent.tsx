import * as React from 'react';
import { QuestionInfoPropsType } from './interface';
import { useForm } from 'antd/es/form/Form';
import { Form, Input } from 'antd';

const { TextArea } = Input;

const PropComponent: React.FunctionComponent<QuestionInfoPropsType> = (props) => {
  const { title, desc, onChange, disabled } = props;

  const [form] = useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      title,
      desc,
    });
  }, [title, desc]);
  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        title,
        desc,
      }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="描述" name="desc" rules={[{ required: true, message: '请输入描述' }]}>
        <TextArea></TextArea>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
