import React, { useState } from 'react';
import Timer from './Timer';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import ChangeDescription from './ChangeDescription';


const Goal = (props) => {
    const takeData = useLocation();
    const data = takeData.state;
    console.log(data)

    const history = useHistory();
    
    const handlegoToMyPageClick = () => {
        history.push('/user');
    };

    const handleReomveGoalClick = () => {
        if (window.confirm("힘들게 쌓아놓은 목표를 이렇게 쉽게 포기하시겠습까?")) {
            axios
            .delete("http://localhost:4000/goals", {
                headers: {
                    authorization: `Bearar ${data.token}`,
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                data:{
                    goalName: data.goalName
                }
            }
            )
            .then(() => {
                history.push('/user');
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
            <ChangeDescription description={data.description} token={data.token} timesId={data.timesId} goalName={data.goalName} />
            <Timer token={data.token} timesId={data.timesId} accTime={data.accTime} totalTime ={data.totalTime} goalName={data.goalName} />
        </div>
    );
};

export default Goal;