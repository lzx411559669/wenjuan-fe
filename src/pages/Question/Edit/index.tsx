import * as React from 'react';
import { useParams } from 'react-router-dom';
import EditCanvas from './EditCanvas';

interface IEditProps {}

const Edit: React.FunctionComponent<IEditProps> = (props) => {
  const { id } = useParams();
  return (
    <>
      <div className="h-[100vh] w-full flex flex-col">
        <div>Header</div>
        <div className=" bg-gray-200 flex-auto  items-center py-3">
          <div className="flex mx-6 h-full">
            <div className="w-[285px] bg-white py-3"></div>
            <div className="flex-1 relative overflow-hidden">
              <div className=" bg-white absolute  w-[600px] h-full overflow-auto top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-lg">
                <div className="h-[2000px]">
                  <EditCanvas></EditCanvas>
                </div>
              </div>
            </div>
            <div className="w-[300px] bg-white py-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
