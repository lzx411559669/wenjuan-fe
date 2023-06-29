import MyBar from '@/components/Charts/MyBar';
import * as React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { QuestionCheckboxStatPropsType } from './interface';


const StatComponent: React.FunctionComponent<QuestionCheckboxStatPropsType> = ({ stat }) => {
  return (
    <>
      <MyBar data={stat}></MyBar>
    </>
  );
};

export default StatComponent;
