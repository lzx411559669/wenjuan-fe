import SortableContainer from '@/components/DragSortable/SortableContainer';
import SortbaleItem from '@/components/DragSortable/SortableItem';
import { getComponentConfByType } from '@/components/QuestionComponents';
import QuestionInput from '@/components/QuestionComponents/QuestionInput/Component';
import QuestionTitle from '@/components/QuestionComponents/QuestionTitle/Component';
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress';
import useLoadQuestionData from '@/hooks/useLoadQuestionData';
import useComponentsState, { ComponentInfoType } from '@/store/componentState';
import * as React from 'react';

interface IEditCanvasProps {}

const getComponent = (componentInfo: ComponentInfoType) => {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);
  if (!componentConf) {
    return null;
  }
  const Component = componentConf.Component;
  return <Component {...props}></Component>;
};

const EditCanvas: React.FunctionComponent<IEditCanvasProps> = (props) => {
  const { actions } = useLoadQuestionData();

  const [componentsState] = useComponentsState();

  useBindCanvasKeyPress();

  const { componentList, selectedId } = componentsState;

  const handleClick = (fe_id: string) => {
    actions.changeSelectedId(fe_id);
  };
  const sortableItems = componentList
    .filter((item) => !item.isHidden)
    .map((c) => ({ ...c, id: c.fe_id }));
  //拖拽借宿
  const onDragEnd = (items: any) => {
    actions.resetComponents(items);
  };
  return (
    <SortableContainer items={sortableItems} onDragEnd={onDragEnd}>
      <div className="min-h-full overflow-hidden bg-white">
        {componentList
          .filter((item) => !item.isHidden)
          .map((item, index) => {
            const { fe_id, type, isLocked } = item;
            return (
              <SortbaleItem id={fe_id} key={fe_id}>
                <div
                  key={fe_id}
                  onClick={() => handleClick(fe_id)}
                  className={`component-wrapper ${fe_id === selectedId ? 'border-important' : ''} ${
                    isLocked ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <div className="pointer-events-none">{getComponent(item)}</div>
                </div>
              </SortbaleItem>
            );
          })}
      </div>
    </SortableContainer>
  );
};

export default EditCanvas;
