import * as React from 'react';
import { useParams } from 'react-router-dom';

interface IEditProps {}

const Edit: React.FunctionComponent<IEditProps> = (props) => {
  const { id } = useParams();
  return <>{id}</>;
};

export default Edit;
