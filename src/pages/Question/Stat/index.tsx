import * as React from 'react';
import StatHeader from './StatHeader';
import ComponentList from './ComponentList';
import useLoadQuestionData from '@/hooks/useLoadQuestionData';
import useComponentsState from '@/store/componentState';
import PageStat from './PageStat';
import ChartStat from './ChartStat';

interface IStatProps {}

const Stat: React.FunctionComponent<IStatProps> = (props) => {
  const { componentsState } = useLoadQuestionData();
  // const [componentsState,actions] = useComponentsState()
  const { componentList } = componentsState;

  const [selectedId, setSelectedId] = React.useState<string>(componentList[0]?.fe_id || '');

  const [selectedComponentType, setSelectedComponentType] = React.useState('');

  return (
    <>
      <div className="h-[100vh] w-full flex flex-col">
        <div>
          <StatHeader></StatHeader>
        </div>
        <div className=" bg-gray-200 flex-auto  items-center py-3">
          <div className="flex mx-6 h-full">
            <div className="w-[350px] bg-white p-3">
              <ComponentList
                componentList={componentList}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                setSelectedComponentType={setSelectedComponentType}
              ></ComponentList>
            </div>
            <div className="flex-1 relative overflow-hidden mx-6">
              <div className=" bg-white absolute  w-full  h-full overflow-auto top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-lg">
                <PageStat
                  setSelectedId={setSelectedId}
                  setSelectedComponentType={setSelectedComponentType}
                  selectedId={selectedId}
                ></PageStat>
              </div>
            </div>
            <div className="w-[500px] bg-white p-3 flex items-center">
              <ChartStat
                selectedComponentId={selectedId}
                selectedComponentType={selectedComponentType}
              ></ChartStat>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stat;
