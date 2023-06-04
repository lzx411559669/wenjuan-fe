import * as React from 'react';
import { QuestionParagraphPropsType } from './interface';
import { Checkbox, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
const { TextArea } = Input;

const PropComponent: React.FunctionComponent<QuestionParagraphPropsType> = (props) => {
  const { text, isCenter, onChange, disabled } = props;
  const [form] = useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      text,
      isCenter,
    });
  }, [text, isCenter]);

  const handleChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          text,
          isCenter,
        }}
        disabled={disabled}
        onValuesChange={handleChange}
      >
        <Form.Item
          name="text"
          label="段落内容"
          rules={[{ required: true, message: '请输入段落内容' }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item name="isCenter" valuePropName="checked">
          <Checkbox>居中显示</Checkbox>
        </Form.Item>
      </Form>
    </>
  );
};

export default PropComponent;
