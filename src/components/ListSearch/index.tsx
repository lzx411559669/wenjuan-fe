import * as React from 'react';
import { Input } from 'antd';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { List_SEARCH_PARAM_KEY } from '@/utils/constants';
const { Search } = Input;

interface IListSearchProps {}

const ListSearch: React.FunctionComponent<IListSearchProps> = (props) => {
  const nav = useNavigate();

  const { pathname } = useLocation();
  const [value, setValue] = React.useState<string>('');

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const params = searchParams.get(List_SEARCH_PARAM_KEY);
    setValue(params || '');
  }, [searchParams]);

  const onSearch = () => {
    nav({
      pathname: pathname,
      search: `?${List_SEARCH_PARAM_KEY}=${value}`,
    });
  };
  return (
    <>
      <Search
        value={value}
        allowClear
        onChange={inputChange}
        onSearch={onSearch}
        enterButton
      ></Search>
    </>
  );
};

export default ListSearch;
