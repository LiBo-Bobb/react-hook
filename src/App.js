import React, { Component, createContext, lazy, Suspense } from 'react'


const BatteryContnet = createContext(90)


const About = lazy(() => import(/*.webpackChunkName:."about"*/'./About'))



class App extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
    }
  }





  render() {
    const { count } = this.state
    return <div>

    </div>
  }
}



export default App;
