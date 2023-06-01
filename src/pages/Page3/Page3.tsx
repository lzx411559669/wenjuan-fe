import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { useRequest } from 'ahooks';
import { Get } from '@/utils/http';
import { Button } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';
import useMousePointer from '@/hooks/useMousePointer';
function Page3() {
  const [data, setData] = useState<any>([1, 2, 3]);
  useLayoutEffect(() => {
    const getUser = async () => {
      const res = await Get<any>('/api/getResouceList');
      return res.data;
    };
    getUser().then((data) => {
      setData(data);
    });
  }, []);

  const [x, y] = useMousePointer();

  return (
    <>
      <Meta title="page 3" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">Page 3</Typography>
        <div>{JSON.stringify(data)}</div>
        <div>x:{x}</div>
        <div>y:{y}</div>
        {/* <Button onClick={getUser}>请求</Button> */}
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Page3;
