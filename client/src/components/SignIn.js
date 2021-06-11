import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const SignIn = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        if (!email || !password) {
            return alert('이메일과 비밀번호를 다 기입해주세요')
        }
        axios.post("https://10k/signin", {
            email: email,
            password: password
        }).then((res) => {
            props.loginHandler(res)
        }).catch((err) => alert("이메일과 비밀번호를 다시 확인해주세요"))
    }

    return (
        <div>
            <div>
                <span>이메일</span>
                <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
                <span>비밀번호</span>
                <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
                <Link to="/signup">아이디가 없으신가요?</Link>
            </div>
            <button type="submit" onClick={handleLogin}>로그인</button>
        </div>
    );
};

export default SignIn;