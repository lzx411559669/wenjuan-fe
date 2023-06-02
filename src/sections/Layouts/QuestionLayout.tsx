import * as React from 'react';
import { Outlet } from 'react-router-dom';

const QuestionLayout: React.FunctionComponent = () => {
  return (
    <>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default QuestionLayout;
