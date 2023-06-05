import usePageInfoState from '@/store/pageInfoState';
import { Form, Input } from 'antd';
import * as React from 'react';

interface IPageSettingProps {}

const PageSetting: React.FunctionComponent<IPageSettingProps> = (props) => {
  const [pageInfoState, actions] = usePageInfoState();
  const [form] = Form.useForm();

  const handleValuesChange = () => {
    actions.resetPageInfoState(form.getFieldsValue());
  };

  React.useEffect(() => {
    form.setFieldsValue(pageInfoState);
  }, [pageInfoState]);
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={pageInfoState}
        onValuesChange={handleValuesChange}
      >
        <Form.Item name="title" label="问卷标题" rules={[{ required: true, message: '问卷标题' }]}>
          <Input placeholder="请输入标题"></Input>
        </Form.Item>
        <Form.Item name="desc" label="问卷描述">
          <Input.TextArea placeholder="请输入问卷描述"></Input.TextArea>
        </Form.Item>
        <Form.Item name="css" label="样式代码">
          <Input.TextArea placeholder="请输入样式代码"></Input.TextArea>
        </Form.Item>
        <Form.Item name="js" label="脚本代码">
          <Input.TextArea placeholder="请输入脚本代码"></Input.TextArea>
        </Form.Item>
      </Form>
      <div>{JSON.stringify(pageInfoState)}</div>
    </>
  );
};

export default PageSetting;
