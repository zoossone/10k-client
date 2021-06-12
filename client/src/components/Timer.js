import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Timer = (props) => {
    const [time, setTime] = useState(0)
    const [curAccTime, setCurAccTime] = useState(props.accTime)
    const [isRunning, setIsRunning] = useState(false)
    // math함수써서 시분초로 나타내기

    const saveTime = () => {
        // console.log(typeof(String(time))) 여긴 그냥 시간 축적시간 ㄴㄴ 요청키값 변경예정.
        axios.post("http://10k/goals/time", {
            token: props.token,
            timesId: props.timesId,
            accTime: props.accTime,
            time: String(time)
        }, {
            headers: {
                Authorization: `Bearar ${props.token}`,
                "Content-Type": "application/json"
            },
            withCredentials: true
        }).then((res) => {
            setCurAccTime(res.accTime)
        })
    }

    useEffect(() => {
        let interval = null
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1)
            }, 1000);
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isRunning])
    // isrunning상태가 변할때만 useffect 실행
    // https://squll1.tistory.com/entry/javascript-setTimeout-setInterval-clearInterval
    // start버튼 누르면 isRunning 상태가 변하므로 useEffect가 실행됨.
    // setInterval함수에 의해서 1초간격으로 setInterval 출력. 1..2..3..4..5..
    // stop버튼 누르면 다시 isRunning의 상태가 false로 되므로, useEffect다시 실행. interval값이 null이 되고
    // isRunning이 false이므로 조건문에 의해서 clearInterval함수 실행되면서 setinterval함수가 
    // 반복하고 있는걸 중지.
    return (
        <div>
            <span>타이머 페이지</span>
            <div>
                <span>{("0" + Math.floor(time / 3600)).slice(-2)}:</span>
                <span>{("0" + Math.floor(time / 60) % 60).slice(-2)}:</span>
                <span>{("0" + (time) % 60).slice(-2)}</span> 
                {/* 문자열 slice로 자르자잉 */}
            </div>
            <div>
                <button onClick={() => setIsRunning(true)}>Start</button>
                <button onClick={() => setIsRunning(false)}>Stop</button>
                <button onClick={() => setIsRunning(true)}>Resume</button>
                <button onClick={() => setTime(0)}>Reset</button>
                <button onClick={saveTime}>Save</button>
            </div>
            <div>
                <span>{curAccTime}</span>
            </div>
            <div>
            <span>{props.totalTime}</span>
            </div>
        </div>
    );
};

export default Timer;