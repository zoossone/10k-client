import './App.css';
import React, { useState } from 'react'
import { Route, Redirect } from "react-router-dom"
import SignUp from './components/SignUp';
import SignIn from './components/SignIn'
import Goal from './components/Goal'
import MyPage from './components/MyPage'
import Timer from './components/Timer';

// 클래스명은 아직 넣지말기. 협의 후 넣기.

function App() {
  const [login, setLogin] = useState(false)
  const [token, setToken] = useState('')
  // const [userInfo, setUserInfo] = useState({})
  // const [times, setTimes] = useState([]) // times 여러개라서 빈 배열 골(개발, 요리 이런거..)

  return (
    <div className="App">
      <Route path='/signin'
        render={() => (
          <SignIn setLogin={setLogin} setToken={setToken} />
        )} />
      <Route path='/signup'
        render={() => (
          <SignUp />
        )} />

      <Route path='/user' render={() => <MyPage login={login} setLogin={setLogin} token={token} setToken={setToken} />} />
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
