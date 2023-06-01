import * as React from 'react';
import { useRequest } from 'ahooks';
import { Get } from '@/utils/http';

interface IRequestProps {}

const Request: React.FunctionComponent<IRequestProps> = (props) => {
  const getUser = async () => {
    const res = await Get<any>('/api/getResouceList');
    return res.data;
  };

  const { data } = useRequest(getUser);
  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};

export default Request;
