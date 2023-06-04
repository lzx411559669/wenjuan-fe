import * as React from 'react';
import { OptionType, QuestionCheckboxPropsType } from './interface';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

interface IPropComponentProps {}

const PropComponent: React.FunctionComponent<QuestionCheckboxPropsType> = (props) => {
  const { title, list, onChange, isVertical, disabled } = props;
  const [form] = Form.useForm();

  const handleValuesChange = () => {
    if (onChange) {
      const { list } = form.getFieldsValue();
      list.forEach((element: OptionType) => {
        if (element.value) {
          element.value = nanoid();
        }
      });
      onChange(form.getFieldsValue());
    }
  };

  React.useEffect(() => {
    form.setFieldsValue({
      title,
      list,
      isVertical,
    });
  }, [title, list, isVertical]);
  return (
    <Form
      layout="vertical"
      disabled={disabled}
      initialValues={{
        title,
        list,
        isVertical,
      }}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '臣如暗示，这是标题' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项" rules={[{ required: true, message: '请输入标题' }]}>
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item
                      name={[name, 'label']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (rule, value) => {
                            const { list } = form.getFieldsValue();
                            let num = 0;
                            list.forEach((item: OptionType) => {
                              if (item.label === value) num++;
                            });

                            if (num === 1) return Promise.resolve();
                            return Promise.reject(new Error('选项重复了'));
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字"></Input>
                    </Form.Item>
                    {index > 0 && (
                      <Button
                        type="link"
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                      ></Button>
                    )}
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  block
                  type="link"
                  onClick={() => add({ vauel: '', label: '', checked: false })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
