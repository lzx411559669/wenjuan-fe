import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '@/utils/constants';
import { Pagination } from 'antd';
import * as React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type PropsType = {
  total: number;
};
const ListPage: React.FunctionComponent<PropsType> = (props: PropsType) => {
  const { total } = props;

  const [current, setCurrent] = React.useState<number>(1);

  const [pageSize, setPageSize] = React.useState<number>(10);

  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const page = searchParams.get(LIST_PAGE_PARAM_KEY);
    const pageSize = searchParams.get(LIST_PAGE_SIZE_PARAM_KEY);
    setCurrent(page ? parseInt(page) : 1);
    setPageSize(pageSize ? parseInt(pageSize) : 10);
  }, [searchParams]);

  const nav = useNavigate();
  const { pathname } = useLocation();

  const pageChange = (page: number, pageSize: number) => {
    // setCurrent(page);
    // setPageSize(pageSize);
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname: pathname,
      search: searchParams.toString(),
    });

    // window.location.search = searchParams.toString();
  };
  return (
    <>
      <div className=" text-right">
        <Pagination
          showSizeChanger
          defaultCurrent={1}
          pageSize={pageSize}
          current={current}
          onChange={pageChange}
          total={total}
        />
      </div>
    </>
  );
};

export default ListPage;
