import React, { useState } from 'react';

const MyPage = () => {
    const [goalName, setGoalName] = useState('')
    const [desc, setDesc] = useState('')

    return (
        <div>
            mypage 입니다.
        </div>
    );
};

export default MyPage;