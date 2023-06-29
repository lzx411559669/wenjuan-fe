import MyPie from '@/components/Charts/MyPie';
import * as React from 'react';
import { QuestionRadioStatPropsType } from './interface';

const StatComponent: React.FunctionComponent<QuestionRadioStatPropsType> = ({ stat = [] }) => {
  return (
    <>
      <MyPie data={stat}></MyPie>
    </>
  );
};

export default StatComponent;
