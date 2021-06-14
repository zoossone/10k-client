import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
// import Select from 'react-select';
import InputNewGoal from './InputNewGoal';

const MyPage = (props) => {

    const [newGoalList, setNewGoalList] = useState('');

    // mypage 정보요청
    axios
        .get("http://theone10k.kro.kr/user", {
            headers: {
                Authorization: `Bearar ${props.token}`,
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        .then((res) => {
            const [id, userName, email, goalList] = res;
            props.setUserInfo({
                'id': id,
                'userName': userName,
                'email': email
            });
            props.setTimes(goalList); // goalList가 들어간 state는 times이다.
        })
        .catch(e => e);

    //props.times의 값을 절대 변경해서는 안되고 사용만 해야한다
    // 근데 여기서는 요청을 안했다. 기억해둘것
    const showGoalList = () => {
        //goals의 리스트를 조회한 후 뿌려준다.
        const goals = props.times;
        const arr = [
            {goalName: '요리',
            accTime: 0,
            description: '요리 잘하자',
            totalTime: 10
        },
            {goalName: '운동',
            accTime: 0,
            description: '운동 잘하자',
            totalTime: 9
        },
            {goalName: '취미',
            accTime: 0,
            description: '취미 잘하자',
            totalTime: 8
        },
            {goalName: '개발',
            accTime: 0,
            description: '개발 잘하지',
            totalTime: 7
        },
            {goalName: '공부',
            accTime: 0,
            description: '공부 잘하자',
            totalTime: 6
        }
        ];
        const list = arr.map((el) => {
            return <li> <Link to={{ // totaltime을 추가필요
                pathname: "/mypage/goal",
                state: {
                    timesId: el.timesId,
                    goalName: el.goalName,
                    accTime: el.accTime,
                    totalTime: el.totalTime,
                    description: el.description,
                    token: props.token
                }
            }}>{el.goalName}</Link> </li>
        });
        return <ul>{list}</ul>
    };

    const handleLogoutClick = () => {
        if (window.confirm("정말 로그아웃 하시겠어요?")) {
            axios
                .get("http://theone10k.kro.kr/signout", {
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
                .delete("http://theone10k.kro.kr/user", {
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
            <InputNewGoal userInfo={props.userInfo} times={props.times} newGoalList={newGoalList} setNewGoalList={setNewGoalList}/>
            {showGoalList()}
        </div>
    );
};

export default MyPage;