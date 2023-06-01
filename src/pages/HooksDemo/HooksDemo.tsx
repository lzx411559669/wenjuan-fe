import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '@mui/material';

type Props = {};

function Example(props: any) {
  const { example } = props;
  const handleClick = () => {
    setTimeout(() => {
      let count = () => example.count;
      alert(count());
    }, 3000);
  };
  return (
    <div>
      <p>{example.count}</p>
      <button onClick={handleClick}>Alert Count</button>
    </div>
  );
}

const ChildComp = (props: { info: { name: string; age: number }; changeName: Function }) => {
  console.log('ChildComp');
  return <>childDemo</>;
};
//改进：我们可以使用 memo 包一层，就能解决上面的问题；
//但是仅仅解决父组件没有传参给子组件的情况以及父组件传简单类型的参数给子组件的情况（例如 string、number、boolean等）；
//如果有传复杂属性应该使用 useCallback（回调事件）或者 useMemo（复杂属性）
const MemoChildComp = memo(ChildComp);

// 父组件
const HooksDemo = () => {
  const [count, setCount] = useState(0);

  const [example, setExample] = useState({ count: 0 });
  //   useEffect(() => {
  //     console.log(`You clicked ${count} times`);
  //   }, [count]);

  useEffect(() => {
    const timer = setInterval(
      () =>
        setExample((example: any) => {
          return {
            ...example,
            count: example.count + 1,
          };
          //   return Object.assign(example, { count: example.count + 1 });
        }),
      1000,
    );
    return () => {
      clearInterval(timer);
    };
  }, []);
  const [name] = useState('jack');
  const [age] = useState(11);
  // 点击父组件按钮，触发父组件重新渲染；父组件渲染，const info = { name, age } 一行会重新生成一个新对象，导致传递给子组件的 info 属性值变化，进而导致子组件重新渲染。

  // const info = { name, age };

  /* 解决：使用 useMemo 将对象属性包一层，useMemo 有两个参数：
     第一个参数是个函数，返回的对象指向同一个引用，不会创建新对象；
     第二个参数是个数组，只有数组中的变量改变时，第一个参数的函数才会返回一个新的对象。 
  */
  const info = useMemo(() => ({ name, age }), [name, age]);
  /**
   * 点击父组件按钮，改变了父组件中 count 变量值（父组件的 state 值），进而导致父组件重新渲染；父组件重新渲染时，会重新创建 changeName 函数，即传给子组件的 changeName 属性发生了变化，导致子组件渲染；
   */

  /*    const changeName = () => {
      console.log('输出名称...');
      }; */

  /**
   * 解决：修改父组件的 changeName 方法，用 useCallback 钩子函数包裹一层， useCallback 参数与 useMemo 类似
   */

  const changeName = useCallback(() => {
    console.log('输出名称...');
  }, []);
  //useRef 1.指向 dom 元素 2.存放变量
  const myRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    myRef?.current?.focus();
  }, [myRef]);

  const myRef2 = useRef(0);

  useEffect(() => {
    myRef2.current = count;
  });

  function handleClick() {
    setTimeout(() => {
      console.log(count); // 3
      console.log(myRef2.current); // 6
    }, 1000);
  }

  return (
    <div className="App">
      <div>hello world {count}</div>
      <div
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        点击增加
      </div>
      {/* 当父组件重新渲染时，子组件也会重新渲染，即使子组件的 props 和 state 都没有改变 */}
      {/* <ChildComp></ChildComp> */}
      <MemoChildComp info={info} changeName={changeName} />

      <div>
        <h1>useRef</h1>
        <input ref={myRef} type="text" />
      </div>

      <div>
        <Button onClick={() => handleClick()} variant="contained">
          查看
        </Button>
      </div>
      <div>
        {example.count}
        <Example example={example}></Example>
      </div>
    </div>
  );
};

// function HooksDemo({}: Props) {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <div className="App">
//         <div>hello world {count}</div>
//         <div
//           onClick={() => {
//             setCount((count) => count + 1);
//           }}
//         >
//           点击增加
//         </div>
//         <childDemo />
//       </div>
//     </div>
//   );
// }

export default HooksDemo;
