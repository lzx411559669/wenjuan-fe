import SortableContainer from '@/components/DragSortable/SortableContainer';
import SortbaleItem from '@/components/DragSortable/SortableItem';
import useComponentsState from '@/store/componentState';
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Space, message, Button } from 'antd';
import * as React from 'react';

interface ILayersProps {}

const Layers: React.FunctionComponent<ILayersProps> = (props) => {
  const [componentsState, actions] = useComponentsState();

  const { componentList, selectedId } = componentsState;

  const [changeId, setChangeId] = React.useState<string>('');

  const handleClick = (fe_id: string) => {
    const com = componentList.find((c) => c.fe_id === fe_id);
    if (com && com.isHidden) {
      message.info('不能选中隐藏的组件');
      return;
    }
    if (selectedId !== fe_id) {
      actions.changeSelectedId(fe_id);
      setChangeId('');
      return;
    }
    setChangeId(fe_id);
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    const com = componentList.find((c) => c.fe_id === changeId);
    if (!selectedId || !value) {
      return;
    }
    if (com) {
      actions.changeComponentTitle(changeId, value);
    }
  };

  const changeHidden = (fe_id: string, isHidden: boolean) => {
    if (!fe_id) {
      return;
    }
    actions.changeComponentHidden(fe_id, isHidden);
  };

  const changeLocked = (fe_id: string) => {
    if (!fe_id) {
      return;
    }
    actions.toggleComponentLocked(fe_id);
  };

  const sortableItems = componentList.map((c) => ({ ...c, id: c.fe_id }));
  //拖拽借宿
  const onDragEnd = (items: any) => {
    actions.resetComponents(items);
  };
  return (
    <SortableContainer items={sortableItems} onDragEnd={onDragEnd}>
      {componentList.map((c) => {
        const { fe_id, title, isHidden, isLocked } = c;
        return (
          <SortbaleItem id={fe_id} key={fe_id}>
            <div className=" flex my-4 justify-between px-2">
              <div
                className={`${selectedId === fe_id ? 'text-blue-500' : ''} cursor-pointer flex-1`}
                onClick={() => handleClick(fe_id)}
              >
                {changeId === fe_id && (
                  <Input
                    onChange={changeTitle}
                    onPressEnter={() => setChangeId('')}
                    onBlur={() => setChangeId('')}
                  ></Input>
                )}
                {changeId !== fe_id && title}
              </div>
              <div className="flex-1 text-right">
                <Space>
                  <Button
                    className={`${!isHidden ? 'opacity-20' : ''} hover:opacity-100`}
                    shape="circle"
                    onClick={() => changeHidden(fe_id, !isHidden)}
                    type={isHidden ? 'primary' : 'default'}
                    icon={<EyeInvisibleOutlined />}
                  ></Button>
                  <Button
                    className={`${!isHidden ? 'opacity-20' : ''} hover:opacity-100`}
                    shape="circle"
                    onClick={() => changeLocked(fe_id)}
                    type={isLocked ? 'primary' : 'default'}
                    icon={<LockOutlined />}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortbaleItem>
        );
      })}
    </SortableContainer>
  );
};

export default Layers;
