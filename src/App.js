import React, { Component, createContext, useEffect, useState, } from 'react'


const BatteryContnet = createContext(90)


// const About = lazy(() => import(/*.webpackChunkName:."about"*/'./About'))



class App1 extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
    }
  }
  render() {
    const { count } = this.state
    return <div>
      <button onClick={() => { this.setState({ count: count + 1 }) }}>
        点击{count}
      </button>
    </div>
  }
}

class App2 extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
      size: {
        width: document.documentElement.clientWidth,
        heigth: document.documentElement.clientHeight,
      }
    }
  }

  // useEffect
  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        heigth: document.documentElement.clientHeight,
      }
    })

  }

  componentDidMount() {
    document.title = this.state.count
    window.addEventListener("resize", this.onResize, false)
    console.log("componentDidMount....", 1)
  }
  componentWillUnmount() {
    console.log("componentWillUnmount....", 3)

    window.removeEventListener("resize", this.onResize, false)
  }

  componentDidUpdate() {
    console.log("componentDidUpdate....", 2)
    document.title = this.state.count
    window.addEventListener("resize", this.onResize, false)



  }
  render() {
    const { count, size } = this.state
    return <div>
      <button onClick={() => { this.setState({ count: count + 1 }) }}>
        点击{count}
        size:{size.width}*{size.heigth}
      </button>
    </div>
  }
}
function App(props) {
  const [count, setCount] = useState(() => {
    console.log("initCOunt.....")
    // 这里只会执行一次  
    return props.defaultCount || 0
  });

  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    heigth: document.documentElement.clientHeight,
  })

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      heigth: document.documentElement.clientHeight,
    })
  }
  useEffect(() => {
    // effect  统一在渲染后调用
    document.title = count
    return () => {
      // cleanup
    }
  })

  useEffect(() => {
    console.log("count...", count)
  }, [])

  useEffect(() => {
    // effect
    window.addEventListener("resize", onResize, false)
    return () => {
      // cleanup
      window.removeEventListener("resize", onResize, false)
    }
  }, [])

  const onClick = () => {
    console.log("click...")
  }

  useEffect(() => {
    document.querySelector('#size').addEventListener("click", onClick, false)
    console.log("didupdate")
    return () => {
      console.log("remobve")
      document.querySelector('#size').removeEventListener("click", onClick, false)

    }
  })

  return <div>
    <button onClick={() => { setCount(count + 1) }}>
      点击{count}
    </button>
    {
      count % 2 ? <span id="size">
        span--size:{size.width}*{size.heigth}
      </span> : <p id="size">
          p--size:{size.width}*{size.heigth}
        </p>
    }

  </div>
}






export default App;
