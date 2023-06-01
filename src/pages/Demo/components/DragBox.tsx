import * as React from 'react';
import { ReactNode } from 'react';

// interface IDragBoxProps {
//     children:ReactNode
// }
type PropsWithChildren<P> = P & { children?: ReactNode };

type IDragBoxProps = PropsWithChildren<{}>;

const DragBox: React.FunctionComponent<IDragBoxProps> = (props) => {
  return <>{props?.children}</>;
};

export default DragBox;
