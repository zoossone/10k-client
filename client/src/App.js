import React, { useState } from 'react'
import { Route, Redirect } from "react-router-dom"
import SignUp from './components/SignUp';
import SignIn from './components/SignIn'
import Goal from './components/Goal'
import MyPage from './components/MyPage'
import Timer from './components/Timer';


function App() {
  const [login, setLogin] = useState(false)
  const [token, setToken] = useState('')

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

      <Route
        path='/'
        render={() => {
          if (login) {
            return <Redirect to='/user' />;
          }
          return <Redirect to='/signin' />;
        }}
      />
    </div>
  );
}

export default App;
