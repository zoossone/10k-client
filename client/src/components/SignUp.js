import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const SignUp = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('') // 이건 요청ㄴㄴ
    const history = useHistory()

    const handleClick = () => {
        if(!name || !email || !password) {
            return alert('모든 항목을 작성하셔야 합니다.')
        } else if(password !== passwordCheck) {
            return alert('비밀번호 재확인 부탁드립니다.')
        }
        axios.post("http://localhost:4000/signup", {
            email: email,
            name: name,
            password: password
        }).then(() => history.push('/signin'))
        .catch((e) => alert(e))
    }

    return (
        <div>
            <span><b>회원가입</b></span>
            <div>
                <input type="text" placeholder="name" 
                onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
                <input type="text" placeholder="email" 
                onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
                <input type="password" placeholder="password" 
                onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
                <input type="password" placeholder="password check"
                onChange={(e) => setPasswordCheck(e.target.value)}></input>
            </div>
                <div><button onClick={handleClick}>회원가입하기!</button></div>
                <hr/>
                <div><Link to="/signin">혹쉬 아이디가 생각나셨습니까??</Link></div>
        </div>
    );
};

export default SignUp;