import React, { useState, useMemo, memo, useCallback, useRef, PureComponent, useEffect } from 'react'








// function Counter(props) {
//   return <h1>
//     Counter:{props.count}
//   </h1>
// }

// memo  性能优化
// const Counter = memo(function Counter(props) {
//   console.log("Counter render....")
//   return <h1 onClick={props.onClick}>
//     double Counter:{props.count}
//   </h1>
// })


class Counter extends PureComponent {
  speak() {
    console.log(`now count is : ${this.props.count}`)
  }

  render() {
    const { props } = this
    return <h1 onClick={props.onClick}>
      double Counter:{props.count}
    </h1>
  }
}
// let it = ""



// useRef  二种用法
function App(props) {
  const [count, setCount] = useState(() => {
    // console.log("initCOunt.....")
    // 这里只会执行一次  
    return props.defaultCount || 0
  });
  const [clickCount, setClickCount] = useState(0);
  const counterRef = useRef()
  // useRef 的第二种用法  ，访问上次状态
  let it = useRef()


  // 如果useMemo 返回的是一个函数，则可以直接使用useCallback ，省去顶层函数
  const onClick = useCallback(() => {
    setClickCount((clickCount) => clickCount + 1)
    console.log("counterRef...", counterRef.current)
    counterRef.current.speak()
  }, [counterRef])

  useEffect(() => {
    // effect
    it.current = setInterval(() => {
      console.log('it,,,',it)
      setCount(count => count + 1)
    }, 1000)

  },[])

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current)
    }
    return () => {
    }
  })
  return <div>
    <button onClick={() => { setCount(count + 1) }}>
      点击{count}
    </button>
    <br />
    {/* clickCount:{clickCount} */}
    <Counter ref={counterRef} count={count} onClick={onClick} />
  </div>
}






export default App;
