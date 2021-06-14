import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
// import Select from 'react-select';
import InputNewGoal from './InputNewGoal';

const MyPage = (props) => {

    const [newGoalList, setNewGoalList] = useState('');
    console.log(props.token)
    // mypage 정보요청

    useEffect(() => {
        axios
            .get("http://localhost:4000/user", {
                headers: {
                    Authorization: `Bearar ${props.token}`,
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            .then((res) => {
                console.log(res)
                const { name, email, timesData } = res.data;
                props.setUserInfo({
                    'name': name,
                    'timesData': timesData,
                    'email': email
                });
                props.setTimes(timesData); // goalList가 들어간 state는 times이다.
            })
            .catch(e => e);
    }, [newGoalList])


    //props.times의 값을 절대 변경해서는 안되고 사용만 해야한다
    // 근데 여기서는 요청을 안했다. 기억해둘것
    const showGoalList = () => {
        //goals의 리스트를 조회한 후 뿌려준다.
        const goals = props.times;
        const list = goals.map((el) => {
            return <li> <Link to={{ // totaltime을 추가필요
                pathname: "/mypage/goal",
                state: {
                    timesId: el.timesId,
                    goalName: el.goalName,
                    accTime: el.acc_time,
                    totalTime: el.total_time,
                    description: el.description,
                    token: props.token
                }
            }}>{el.goalName}/{el.acc_time}/{el.total_time}</Link> </li>
        });
        return <ul>{list}</ul>
    };

    const handleLogoutClick = () => {
        if (window.confirm("정말 로그아웃 하시겠어요?")) {
            axios
                .get("http://localhost:4000/signout", {
                    headers: {
                        Authorization: `Bearar ${props.token}`,
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                })
                .then((res) => {
                    props.setLogin(false); // 로그아웃 상태로
                    props.setToken(''); // 토큰을 없앤다
                    // history.push("/signin"); // 로그인으로 리다이렉트
                })
                .catch(e => e);
        } else {
            return;
        }
    };

    const handleWithdrawalClick = () => {
        if (window.confirm("회원탈퇴를 하면 저장된 정보가 모두 삭제됩니다. 정말 회원탈퇴를 하시겠어요? :(")) {
            axios
                .delete("http://localhost:4000/user", {
                    headers: {
                        Authorization: `Bearar ${props.token}`,
                        "Content-Type": "application/json"
                    },
                    email: props.userInfo.email,
                    withCredentials: true
                })
                .then((res) => {
                    props.setLogin(false); // 로그아웃 상태로
                    props.setToken(''); // 토큰을 없앤다
                    // history.push("/signin"); // 로그인으로 리다이렉트
                })
                .catch(e => e);
        } else {
            return;
        }
    };
    
    return (
        <div>
            <button onClick={handleLogoutClick}>로그아웃</button>
            <button onClick={handleWithdrawalClick}>회원탈퇴</button>
            <div>
                <span>{props.userInfo.name}님의 목표 달성을 기원합니다!!</span>
            </div>
            <InputNewGoal userInfo={props.userInfo} times={props.times} newGoalList={newGoalList} setNewGoalList={setNewGoalList}
            token={props.token}/>
            {showGoalList()}
        </div>
    );
};

export default MyPage;