import React, { useState } from 'react';
import axios from 'axios'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            signin 페이지입니다.
        </div>
    );
};

export default SignIn;