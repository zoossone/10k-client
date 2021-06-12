import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import Select from 'react-select';

const MyPage = (props) => {
    const [newGoalName, setNewGoalName] = useState('');
    const [desc, setDesc] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const timeOptions = [
        { value: 10, label: 10 },
        { value: 100, label: 100 },
        { value: 1000, label: 1000 },
        { value: 10000, label: 10000 }
      ];
    // const goalOptions = props.times.map((el) => {
    //     return el.goalName;
    // });
    const arr = [{goalName: '요리', a: 0}, {goalName: '운동', a: 0}, {goalName: '개발', a: 0}, {goalName: '스토킹', a: 0}] 
    const goalOptions = arr.map((el) => {
        return { value: el.goalName, label: el.goalName};
    });
    
    /**
     * get: SignOut {Auth}-> res ****
     * delete: Withdrawal -> res ****
     * get: Mypage {Auth}-> res: UserInfo, goals(list)  ****
     * post: My Goal {Auth, timesId} -> res: GoalName, Times ????????????????????????????????????????????????????
     * post: AddGoal {email, Desc, totaltime} -> res: times ****
     * 
     * select -> dropdown
     */

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

    // const goMyGoal = (goalid) => {

    //     axios
    //     .post("http://theone10k.kro.kr/goal", {
    //         headers: {
    //             Authorization: `Bearar ${props.token}`,
    //             "Content-Type": "application/json"
    //         },
    //         withCredentials: true,
    //         timesId: goalid
    //     })
    //     .then((res) => {
    //         // const props.times
    //         const [goalName, accTime, totalTime, description] = res;
    //         // <Route path='/mypage/goal' render={() => <Goal 
    //         //     goalName={goalName} accTime={accTime} totalTime={totalTime} description={description} timesId={goalid}/>} />
    //     })
    // };

    //props.times의 값을 절대 변경해서는 안되고 사용만 해야한다
    // 근데 여기서는 요청을 안했다. 기억해둘것
    const showGoalList = () => {
        //goals의 리스트를 조회한 후 뿌려준다.
        const goals = props.times;
        const arr = [1, 2, 3, 4, 5];
        const list = arr.map((el) => {
            // <li onClick={() => goMyGoal(el.timesId)}> <span>{el.goalName}</span> <span>{el.totalTime}</span> </li>
            return <li> <Link to={{
                pathname: "/mypage/goal",
                state: {
                    timesId: el.timesId,
                    goalName: el.goalName,
                    accTime: el.accTime,
                    totalTime: el.totalTime,
                    description: el.description
                }
            }}>{el}</Link> </li>
        });
        return <ul>{list}</ul>
    };

    const handleLogoutClick = async () => {
        if (window.confirm("정말 로그아웃 하시겠어요?")) {
            console.log("로그아웃 됐습니다")
            const res = await axios
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
                    useHistory.push("/signin"); // 로그인으로 리다이렉트
                })
                .catch(e => e);
        } else {
            console.log("ㄴ로그아웃")
            return;
        }
    };

    const handleWithdrawalClick = async () => {
        if (window.confirm("회원탈퇴를 하면 저장된 정보가 모두 삭제됩니다. 정말 회원탈퇴를 하시겠어요? :(")) {
            console.log("탈퇴 뿌잉뿌잉");
            const res = await axios
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
                    useHistory.push("/signin"); // 로그인으로 리다이렉트
                })
                .catch(e => e);
        } else {
            console.log("탈퇴 취소!")
            return;
        }
    };

    const inputDesc = (e) => {
        setDesc(e.target.value);
    };

    const handleAddGoalClick = () => {
        axios
            .post("http://theone10k.kro.kr/goals", {
                headers: {
                    Authorization: `Bearar ${props.token}`,
                    "Content-Type": "application/json"
                },
                goalName: newGoalName,
                description: desc,
                email: props.userInfo.email,
                totalTime: totalTime,
                accTime: '0'
            })
            .then((res) => {
                const newTimes = [...props.times];
                newTimes.push(res);
                props.setTimes(newTimes);
                showGoalList();
            })
            .catch(e => e);
    };

    const handleTimeChange = (totalTime) => {
        setTotalTime(totalTime);
    };

    const handleSelectGoal = (newGoalName) => {
        setNewGoalName(newGoalName);
    };
    
    return (
        <div>
            <button onClick={handleLogoutClick}>로그아웃</button>
            <button onClick={handleWithdrawalClick}>회원탈퇴</button>
            <div>
                <span>{props.userInfo.name}님의 목표 달성을 기원합니다!!</span>
            </div>
            <div>
                <Select value={newGoalName} onChange={handleSelectGoal} options={goalOptions}></Select>
                <textarea placeholder="목표를 위한 다짐이나 세부사항을 간단하게 적어주세요" onChange={(e) => inputDesc(e)} />
                <Select value={totalTime} onChange={handleTimeChange} options={timeOptions}></Select>
                <button onClick={handleAddGoalClick}>목표 설정</button>
            </div>
            {showGoalList()}
        </div>
    );
};

export default MyPage;