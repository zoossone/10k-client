import React, { useState } from 'react';

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('') // 이건 요청ㄴㄴ

    return (
        <div>
            signup 페이지입니다.
        </div>
    );
};

export default SignUp;