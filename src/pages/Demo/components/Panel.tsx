import React, { ReactNode, memo } from 'react';

const Panel = React.forwardRef((props: any, ref: any) => {
  console.log('🚀 ~ file: Panel.tsx:4 ~ Panel ~ props:', props);
  return (
    <div ref={ref} {...props}>
      {props.children}
    </div>
  );
});

export default memo(Panel);
