import React, { useState } from 'react';
import Timer from './Timer';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';


const Goal = (props) => {
    const [descM, setDescM] = useState('');
    const history = useHistory();
    const takeData = useLocation();
    const data = takeData.state;
    
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

    const makeNewDesc = (e) => {
        setDescM(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleDescChangeClick = () => {
        if (window.confirm("진짜 변경하시겠습니까?")) {
            axios
            .put("http://theone10k.kro.kr/goals", {
                headers: {
                    Authorization: `Bearar ${data.token}`,
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                timesId: data.timesId,
                description: descM
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
            <p>{data.description}</p>
            <form onSubmit={handleSubmit}>
                <textarea placeholder='목표 설명을 변경하고 싶으시면 여기에 새 내용을 적으세요' 
                value={descM} onChange={makeNewDesc}></textarea>
                <button onClick={handleDescChangeClick}>목표 설명 변경</button>
            </form>
            <Timer token={data.token} timesId={data.timesId} accTime={data.accTime} totalTime ={data.totalTime}/>
        </div>
    );
};

export default Goal;