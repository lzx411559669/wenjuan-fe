import useComponentsState from '@/store/componentState';
import { BlockOutlined, CopyOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import { DeleteOutline } from '@mui/icons-material';
import { Space, Button, Tooltip } from 'antd';
import * as React from 'react';

interface IEditToolbarProps {}

const EditToolbar: React.FunctionComponent<IEditToolbarProps> = (props) => {
  const [{ selectedId, copiedComponent }, actions, selectComponent] = useComponentsState();
  //   debugger;
  const { isLocked } = selectComponent;
  const handlerDelete = () => {
    actions.removeSelectedComponent();
  };

  const handlerHidden = () => {
    actions.changeComponentHidden(selectedId, true);
  };

  const handlerLock = () => {
    actions.toggleComponentLocked(selectedId);
  };

  const copy = () => {
    actions.copySelectedComponent();
  };

  const paste = () => {
    actions.pasteCopiedComponent();
  };
  return (
    <>
      <Space>
        <Tooltip title="删除">
          <Button shape="circle" icon={<DeleteOutline />} onClick={handlerDelete}></Button>
        </Tooltip>
        <Tooltip title="隐藏">
          <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handlerHidden}></Button>
        </Tooltip>
        <Tooltip title="锁定">
          <Button
            shape="circle"
            type={isLocked ? 'primary' : 'default'}
            icon={<LockOutlined />}
            onClick={handlerLock}
          ></Button>
        </Tooltip>
        <Tooltip title="复制">
          <Button shape="circle" icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Tooltip title="粘贴">
          <Button
            shape="circle"
            disabled={copiedComponent === null}
            icon={<BlockOutlined />}
            onClick={paste}
          ></Button>
        </Tooltip>
      </Space>
    </>
  );
};

export default EditToolbar;
