import './App.css';
import React, { useState } from 'react'
import { Route, useHistory, Redirect } from "react-router-dom"
import axios from 'axios'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn'
import Goal from './components/Goal'
import MyPage from './components/MyPage'
import Timer from './components/Timer';


// 클래스명은 아직 넣지말기. 협의 후 넣기.

function App() {
  const [login, setLogin] = useState(false)
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [times, setTimes] = useState([]) // times 여러개라서 빈 배열
  const history = useHistory()

  const loginHandler = (data) => {
    setLogin(true)
    setToken(data)
  }

  return (
    <div className="App">
      <Route path='/signin'
        render={() => (
          <SignIn login={login} loginHandler={loginHandler}/>
        )} />
      <Route path='/signup'
        render={() => (
          <SignUp />
        )} />

      <Route path='/user' render={() => <MyPage setLogin={setLogin} token={token} setToken={setToken} userInfo={userInfo}
      setUserInfo={setUserInfo} times={times} setTimes={setTimes} />} />
      <Route path='/mypage/goal' render={() => <Goal />} />
      <Route path='/timer' render={() => <Timer />} />

      {/* <Route
        path='/'
        render={() => {
          if (login) {
            return <Redirect to='/user' />;
          }
          return <Redirect to='/signin' />;
        }}
      /> */}
    </div>
  );
}

export default App;
