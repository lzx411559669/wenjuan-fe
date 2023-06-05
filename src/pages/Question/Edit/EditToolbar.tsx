import useComponentsState from '@/store/componentState';
import {
  BlockOutlined,
  CopyOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { arrayMove } from '@dnd-kit/sortable';
import { DeleteOutline } from '@mui/icons-material';
import { Space, Button, Tooltip } from 'antd';
import * as React from 'react';

interface IEditToolbarProps {}

const EditToolbar: React.FunctionComponent<IEditToolbarProps> = (props) => {
  const [{ selectedId, copiedComponent, componentList }, actions, selectComponent] =
    useComponentsState();
  const componentLength = componentList.length;
  const selectedIndex = componentList.findIndex((item) => item.fe_id === selectedId);
  const isFirst = selectedIndex <= 0;
  const isLast = selectedIndex >= componentLength - 1;

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

  const up = () => {
    actions.resetComponents(arrayMove(componentList, selectedIndex, selectedIndex - 1));
  };

  const down = () => {
    actions.resetComponents(arrayMove(componentList, selectedIndex, selectedIndex + 1));
  };

  const undo = () => {
    actions.handleUndo();
  };
  const redo = () => {
    actions.handleUndo();
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
        <Tooltip title="上移">
          <Button shape="circle" disabled={isFirst} icon={<UpOutlined />} onClick={up}></Button>
        </Tooltip>
        <Tooltip title="下移">
          <Button shape="circle" disabled={isLast} icon={<DownOutlined />} onClick={down}></Button>
        </Tooltip>
        <Tooltip title="撤销">
          <Button shape="circle" icon={<UndoOutlined />} onClick={undo}></Button>
        </Tooltip>
        <Tooltip title="重做">
          <Button shape="circle" icon={<RedoOutlined />} onClick={redo}></Button>
        </Tooltip>
      </Space>
    </>
  );
};

export default EditToolbar;
