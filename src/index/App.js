import { connect } from 'react-redux'

import './App.css'

function App(props) {
  return <div></div>

}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  })(App)



