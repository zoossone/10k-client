import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const MyPage = (props) => {
    const [goalName, setGoalName] = useState('');
    const [desc, setDesc] = useState('');

    /**
     * post: My Goal {Auth, timesId} -> res: GoalName, Times
     * get: SignOut {Auth}-> res ****
     * post: AddGoal {email, Desc, totaltime} -> res: times
     * delete: Withdrawal -> res ****
     * 
     * dropdown
     */

    const handleLogoutClick = async () => {
        if(window.confirm("정말 로그아웃 하시겠어요?")) {
            // console.log("로그아웃됐어요")
            const res = await axios
            .get("https://10k/signout", {
                headers: {
                  'Authorization': props.token
                }
              })
            .catch(e => e);
            props.setLogin(false);
            props.setToken('');
            //토큰을 없애주는 로직
            useHistory.push("/signin");
        } else {
            // console.log("ㄴ로그아웃")
            return;
        }
    };

    const inputDesc = (e) => {
        setDesc(e.target.value);
    };

    const handleWithdrawalClick = async () => {
        if (window.confirm("회원탈퇴를 하면 저장된 정보가 모두 삭제됩니다. 정말 회원탈퇴를 하시겠어요? :(")) {
            console.log("탈퇴 뿌잉뿌잉");
            const res = await axios
            .delete("https://10k/user", {
                headers: {
                  'Authorization': props.token
                }
              })
            .catch(e => e);
            props.setLogin(false);
            props.setToken('');
            useHistory.push("/signin");
        } else {
            console.log("탈퇴 취소!")
        }
    };


    

    return (
        <div>
            <button onClick={handleLogoutClick}>로그아웃</button>
            <button onClick={handleWithdrawalClick}>회원탈퇴</button>
            <div>
                <span>{props.userInfo.name}님의 목표 달성을 기원합니다!!</span>
            </div>
            <div>
                <span>dropdown goal name</span>
                <textarea placeholder="목표를 위한 다짐이나 세부사항을 간단하게 적어주세요" onChange={(e) => inputDesc(e)} />
                <span>dropdown total time</span>
                <button>목표 설정</button>
            </div>
            <ul>
                <li><span>cook</span><span>10h</span></li>
                <li><span>coding</span><span>100h</span></li>
                <li><span>workout</span><span>100h</span></li>
            </ul>
        </div>
    );
};

export default MyPage;