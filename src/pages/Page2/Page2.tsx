import { memo, useEffect, useReducer, useState } from 'react';

import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Button } from '@mui/material';

interface stateType {
  count: number;
}
interface actionType {
  type: string;
}

const initialState = { count: 0 };

const reducer = (state: stateType, action: actionType) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'decrement':
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      throw new Error();
  }
};

const UseReducer = memo(() => {
  console.log('渲染了');
  useEffect(() => {
    console.log('first');
  }, []);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <div>useReducer Count:{state.count}</div>
      <button
        onClick={() => {
          dispatch({ type: 'decrement' });
        }}
      >
        useReducer 减少
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'increment' });
        }}
      >
        useReducer 增加
      </button>
    </div>
  );
});

function Page2() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Meta title="page 2" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">Page 2</Typography>
        <UseReducer></UseReducer>
        <Button>{count}</Button>
        <Button onClick={() => setCount(count + 1)}>add</Button>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Page2;
