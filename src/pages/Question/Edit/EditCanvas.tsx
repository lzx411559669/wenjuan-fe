import { getComponentConfByType } from '@/components/QuestionComponents';
import QuestionInput from '@/components/QuestionComponents/QuestionInput/Component';
import QuestionTitle from '@/components/QuestionComponents/QuestionTitle/Component';
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

  const { componentList, selectedId } = componentsState;

  const handleClick = (fe_id: string) => {
    actions.changeSelectedId(fe_id);
  };
  return (
    <>
      <div className="min-h-full overflow-hidden bg-white">
        {componentList.map((item, index) => {
          const { fe_id, type } = item;
          return (
            <div
              key={fe_id}
              onClick={() => handleClick(fe_id)}
              className={`component-wrapper ${fe_id === selectedId ? 'border-important' : ''}`}
            >
              <div className="pointer-events-none">{getComponent(item)}</div>
            </div>
          );
        })}
        {/* <div className="component-wrapper">
          <div className="pointer-events-none">
            <QuestionTitle></QuestionTitle>
          </div>
        </div>
        <div className="component-wrapper">
          <div className="pointer-events-none">
            <QuestionInput></QuestionInput>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default EditCanvas;
