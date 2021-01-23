import React, { useState, useMemo, memo, useCallback } from 'react'








// function Counter(props) {
//   return <h1>
//     Counter:{props.count}
//   </h1>
// }

// memo  性能优化
const Counter = memo(function Counter(props) {
  console.log("Counter render....")
  return <h1 onClick={props.onClick}>
    double Counter:{props.count}
  </h1>
})



function App(props) {
  const [count, setCount] = useState(() => {
    // console.log("initCOunt.....")
    // 这里只会执行一次  
    return props.defaultCount || 0
  });


  // useMemo 有返回值 在渲染期间执行的
  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  const onClick1 = () => {
    console.log("onClick....")
  }
  const onClick2 = useMemo(() => {
    return () => {
      console.log("onClick....")
    }
  }, [])

  // 如果useMemo 返回的是一个函数，则可以直接使用useCallback ，省去顶层函数
  const onClick = useCallback(() => {
    console.log("onClick....")
  },[])

  return <div>
    <button onClick={() => { setCount(count + 1) }}>
      点击{count}
    </button>
    <Counter count={double} onClick={onClick} />

    {/* double:{double} */}

  </div>
}






export default App;
