import React, { useState, useMemo, memo, useCallback, useRef, PureComponent, useEffect } from 'react'

function useCounter(count) {
  const size = useSize()

  return <h1 >
    Counter:{count}
    <br/>
    w*h:{size.width}*{size.heigth}
  </h1>
}

function useCount(defaultCount) {
  const [count, setCount] = useState(() => {
    return defaultCount || 0
  });
  let it = useRef()
  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)

  }, [])
  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current)
    }
  })
  return [count, setCount]
}


function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    heigth: document.documentElement.clientHeight,
  })
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      heigth: document.documentElement.clientHeight,
    })
  })

  useEffect(() => {
    // effect
    window.addEventListener("resize", onResize, false)
    return () => {
      // cleanup
      window.removeEventListener("resize", onResize, false)
    }
  }, [])
  return size
}

// 自定义hook
function App(props) {
  const [count, setCount] = useCount()
  const Counter = useCounter(count)
  const size = useSize()
  return <div>
    <button onClick={() => { setCount(count + 1) }}>
      点击{count}  w*h:{size.width}*{size.heigth}
    </button>
    <br />
    {/* <Counter count={count} /> */}
    {Counter}
  </div>
}






export default App;
