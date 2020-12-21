import React, { Component, createContext, lazy, Suspense } from 'react'


const BatteryContnet = createContext(90)


const About = lazy(() => import(/*.webpackChunkName:."about"*/'./About'))

class Leaf extends Component {
  static contextType = BatteryContnet
  render() {
    const battery = this.context
    console.log("battery...", battery)
    return <h1>
      {battery}
    </h1>
    // return <BatteryContnet.Consumer>
    //   {
    //     battery => {
    //       return <h1>
    //         {battery}
    //       </h1>
    //     }
    //   }
    // </BatteryContnet.Consumer>
  }

}
class Middle extends Component {

  render() {
    return <Leaf />
  }

}
class App extends Component {
  constructor() {
    super()
    this.state = {
      battery: 60,
      hasError:false,
    }
  }

  // 遇到页面错误，直接返回一个状态，合并到页面状态中
  static getDerivedStateFromError(){
    return {
      hasError:true 
    }
  }

  // render() {
  //   const {battery} = this.state
  //   return <BatteryContnet.Provider value={battery}>
  //     <div onClick={()=>{
  //       this.setState({battery:battery+1})
  //     }}>
  //       dianii
  //     </div>
  //     <Middle />
  //   </BatteryContnet.Provider>
  // }


  // 检测页面错误 
  componentDidCatch(){
    this.setState({hasError:true})
  }


  render() {
    const {hasError} = this.state
    if(hasError){
      return <div>error page</div>
    }
    return <div>
      <Suspense fallback={<div>loading</div>}>
        <About></About>
      </Suspense>
    </div>
  }
}



export default App;
