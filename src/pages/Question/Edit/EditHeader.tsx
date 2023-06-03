import { LeftOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import EditToolbar from './EditToolbar';

const { Title } = Typography;

interface IEditHeaderProps {}

const EditHeader: React.FunctionComponent<IEditHeaderProps> = (props) => {
  const nav = useNavigate();
  return (
    <>
      <div className="bg-white p-3 border-b border-gray-300">
        <div className=" flex my-0 mx-6 items-center">
          <div className=" flex-1">
            <Space>
              <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
                返回
              </Button>
              <h1 className="mb-0  text-lg font-bold">问卷标题</h1>
            </Space>
          </div>
          <div className=" flex-1 text-center">
            <EditToolbar></EditToolbar>
          </div>
          <div className=" flex-1 text-right">
            <Space>
              <Button>保存</Button>
              <Button type="primary">发布</Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHeader;
