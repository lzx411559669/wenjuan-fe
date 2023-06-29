import * as React from 'react';
import MyPie from '../../../components/Charts/MyPie';
import MyBar from '../../../components/Charts/MyBar';
import { useRequest } from 'ahooks';
import { queryComponentStat } from '@/apis/statApis';
import { useParams } from 'react-router-dom';
import { getComponentConfByType } from '@/components/QuestionComponents';

interface IChartStatProps {
  selectedComponentId: string;
  selectedComponentType: string;
}

const ChartStat: React.FunctionComponent<IChartStatProps> = (props) => {
  const { selectedComponentId, selectedComponentType } = props;
  const [stat, setStat] = React.useState([]);

  const { id = '' } = useParams();

  const { run } = useRequest(() => queryComponentStat(id, selectedComponentId), {
    manual: true,
    onSuccess: (data) => {
      setStat(data.stat);
    },
  });

  const getStatElem = () => {
    const component = getComponentConfByType(selectedComponentType);
    const { StatComponent } = component || {};
    if (!selectedComponentId) {
      return <></>;
    }
    return <>{StatComponent ? <StatComponent stat={stat}></StatComponent> : "无统计组件"}</>;
  };

  React.useEffect(() => {
    if (selectedComponentId) {
      run();
    }
  }, [id, selectedComponentId]);

  return (
    <div className="w-[450px] h-[300px] text-black">
      {/* <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer> */}
      {getStatElem()}
    </div>
  );
};

export default ChartStat;
