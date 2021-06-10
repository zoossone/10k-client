import React, { useState } from 'react';
import axios from 'axios'

const SignIn = () => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            signin 페이지입니다.
        </div>
    );
};

export default SignIn;