import { useEffect, useRef, useState } from 'react';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

const getData = async () =>
  new Promise<any>((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          name: 'lzx',
          age: 18,
        }),
      1000,
    );
  });

function Example() {
  const [count, setCount] = useState(0);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const queryData = async () => {
      const res = await getData();
      console.log('🚀 ~ file: Page1.tsx:29 ~ queryData ~ res:', res);
      setUser(res);
    };
    queryData();
  }, []);

  const currentCount = useRef(count);

  currentCount.current = count;

  const handleClick = () => {
    setTimeout(() => {
      setCount(currentCount.current + 1);
    }, 3000);
  };

  return (
    <div>
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>setCount</Button>
      <Button onClick={handleClick}>Delay setCount</Button>
      <div>{user?.name}</div>
    </div>
  );
}

function Example2() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      setCount(count + 1);
    }, 3000);
  };

  return (
    <div>
      <p>{count}</p>
      <Button onClick={() => setCount(count + 1)}>setCount</Button>
      <Button onClick={handleClick}>Delay setCount</Button>
    </div>
  );
}

function Page1() {
  return (
    <>
      <Meta title="page 1" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">Page 1</Typography>
        <Example></Example>
        <div>
          <Example2></Example2>
        </div>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Page1;
