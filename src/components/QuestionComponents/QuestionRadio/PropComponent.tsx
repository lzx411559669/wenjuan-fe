import * as React from 'react';
import { OptionType, QuestionRadioPropsType } from './interface';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

interface IPropComponentProps {}

const PropComponent: React.FunctionComponent<QuestionRadioPropsType> = (props) => {
  const [form] = useForm();
  const { title, options, value, isVertical, onChange, disabled } = props;

  const handleValuesChange = () => {
    if (onChange) {
      const { options } = form.getFieldsValue();
      console.log(
        '🚀 ~ file: PropComponent.tsx:17 ~ handleValuesChange ~ form.getFieldsValue():',
        form.getFieldsValue(),
      );
      options.forEach((item: OptionType) => {
        if (!item.value) item.value = nanoid(5);
      });
      onChange(form.getFieldsValue());
    }
  };

  React.useEffect(() => {
    form.setFieldsValue({
      title,
      options,
      isVertical,
      value,
    });
  }, [title, options, isVertical, value]);

  return (
    <Form
      layout="vertical"
      initialValues={{
        title,
        options,
        isVertical,
        value,
      }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项" rules={[{ required: true, message: '请输入标题' }]}>
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'label']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (rule, value) => {
                            const { options } = form.getFieldsValue();
                            let num = 0;
                            options.forEach((item: OptionType) => {
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
                    {index > 1 && (
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
                  onClick={() => add({ vauel: '', label: '' })}
                  icon={<PlusOutlined />}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="value" label="默认选中">
        <Select value={value} options={options}></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
