import React, { useState } from 'react';
import Timer from './Timer';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import ChangeDescription from './ChangeDescription';


const Goal = (props) => {
    const takeData = useLocation();
    const data = takeData.state;

    const [curDesc, setCurDesc] = useState(data.description);
    const history = useHistory();
    
    const handlegoToMyPageClick = () => {
        history.push('/user');
    };

    const handleReomveGoalClick = () => {
        if (window.confirm("힘들게 쌓아놓은 목표를 이렇게 쉽게 포기하시겠습까?")) {
            axios
            .delete("http://theone10k.kro.kr/goals", {
                headers: {
                    Authorization: `Bearar ${data.token}`,
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                timesId: data.timesId
            })
            .catch(e => alert(e));
        } else {
            return ;
        }
    };

    return (
        <div>
            <button onClick={handlegoToMyPageClick}>MyPage</button>
            <button onClick={handleReomveGoalClick}>목표 지우기</button>
            <h2>{data.goalName}</h2>
            <p>{curDesc}</p>
            <ChangeDescription token={data.token} setCurDesc={setCurDesc} timesId={data.timesId}/>
            <Timer token={data.token} timesId={data.timesId} accTime={data.accTime} totalTime ={data.totalTime}/>
        </div>
    );
};

export default Goal;