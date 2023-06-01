import React, { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';

import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

import Panel from './components/Panel';
import '/node_modules/react-grid-layout/css/styles.css';
// import '/node_modules/react-resizable/css/styles.css';

export default function Demo(props: any) {
  console.log('🚀 ~ file: Demo.tsx:9 ~ Demo ~ props:', props);
  const [count, setCount] = useState(0);

  const increate = () => {
    setCount(count + 1);
  };

  // const getData = async() => {
  //    const res = await new Promise(())
  // }

  useEffect(() => {
    console.log(`You clicked ${count} times`);
  }, []);

  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 3, h: 2 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ];

  return (
    <>
      <Meta title="demo" />
      <div className=" w-full h-[100vh] text-center">
        <div>{count}</div>
        <div>
          <Button onClick={() => increate()} variant="contained">
            count++
          </Button>
        </div>
        <GridLayout className="layout" layout={layout} cols={12} rowHeight={100} width={1200}>
          <div className=" bg-red-500" key="a">
            a
          </div>
          <Panel className=" bg-slate-400" key="b">
            b
          </Panel>

          {/* <div className=" bg-slate-400" key="c">
            c
          </div> */}
          <Card key="c" sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          {/* <Panel key="a">
            <div className=" bg-slate-400" key="a">
              a
            </div>
          </Panel>
          <Panel key="b">
            <div className=" bg-slate-400" key="a">
              b
            </div>
          </Panel>
          <Panel key="c">
            <div className=" bg-slate-400" key="a">
              c
            </div>
          </Panel> */}
        </GridLayout>
      </div>
    </>
  );
}
