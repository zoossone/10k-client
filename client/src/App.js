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
  const [times, setTimes] = useState('')
  const history = useHistory()

  const isAuthenticated = () => {
    axios.get("https://10k/user")
      .then((res) => {
        setLogin(true)
        setUserInfo(res) //서버쪽 요청해서 가져온 데이터 변경
        history.push('/') // 마이페이지 쪽
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setLogin(false)
          history.push('/signin')
        }
      })
  }
  const handleResponseSuccess = () => {
    isAuthenticated()
  }

  return (
    <div className="App">
      <Route path='/signin'
        render={() => (
          <SignIn login={login} handleResponseSuccess={handleResponseSuccess} />
        )} />
      <Route path='/signup'
        render={() => (
          <SignUp handleResponseSuccess={handleResponseSuccess} />
        )} />

      <Route path='/user' render={() => <MyPage />} />
      <Route path='/mypage/goal' render={() => <Goal />} />
      <Route path='/timer' render={() => <Timer />} />

      {/* <Route
        path='/'
        render={() => {
          if (login) {
            return <Redirect to='/mypage' />;
          }
          return <Redirect to='/signin' />;
        }}
      /> */}
    </div>
  );
}

export default App;
