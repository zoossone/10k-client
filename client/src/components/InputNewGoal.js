import React, {useState} from 'react';
import axios from 'axios';
import Select from 'react-select';

function InputNewGoal(props) {

    const [newGoalName, setNewGoalName] = useState('');
    const [desc, setDesc] = useState('');
    const [totalTime, setTotalTime] = useState('');
    console.log(props)

    const timeOptions = [
        { value: 36000, label: '10 hours' },
        { value: 360000, label: '100 hours' },
        { value: 3600000, label: '1000 hours' },
        { value: 36000000, label: '10K hours' }
      ];


    const goalOptions = [
        { value: '개발', label: '개발' },
        { value: '수영', label: '수영' },
        { value: '마라톤', label: '마라톤' },
        { value: '헬스', label: '헬스' },
        { value: '그림', label: '그림' },
        { value: '게임', label: '게임' },
      ];
    


    // const goalOptions = props.times.map((el) => {
    //     return { value: el.goalName, label: el.goalName};
    // });

    // const arr = [{goalName: '요리', a: 0}, {goalName: '운동', a: 0}, {goalName: '개발', a: 0}, {goalName: '스토킹', a: 0}] 
    // const goalOptions = arr.map((el) => {
    //     return { value: el.goalName, label: el.goalName};
    // });

    const inputDesc = (e) => {
        setDesc(e.target.value);
    };

    const handleTimeChange = (totalTime) => {
        setTotalTime(totalTime);
    };

    const handleSelectGoal = (newGoalName) => {
        setNewGoalName(newGoalName);
    };

    const handleAddGoalClick = () => {
        if (newGoalName === '' || desc === '' || totalTime === '') {
            alert("모든 목표 이름, 목표 설명, 목표 시간을 모두 설정해주시기 바랍니다.");
        } else {
            axios
                .post("http://localhost:4000/goals", {
                    goalName: newGoalName.value,
                    description: desc,
                    email: props.userInfo.email,
                    totalTime: String(totalTime.value),
                    accTime: '0'
                },
                    {
                        headers: {
                            authorization: `Bearar ${props.token}`,
                            "Content-Type": "application/json"
                        },
                        withCredentials: true
                    })
                .then((res) => {
                    console.log(res)
                    const newTimes = [...props.times];
                    newTimes.push(res);
                    props.setTimes(newTimes);
                    props.setNewGoalList(res) // 다시 렌더링을 하기 위해서
                })
                .catch(e => e);
        }
    };

    return (<div>
                <Select value={newGoalName} onChange={handleSelectGoal} options={goalOptions}></Select>
                <textarea placeholder="목표를 위한 다짐이나 세부사항을 간단하게 적어주세요" onChange={(e) => inputDesc(e)} />
                <Select value={totalTime} onChange={handleTimeChange} options={timeOptions}></Select>
                <button onClick={handleAddGoalClick}>목표 설정</button>
    </div>);
}

export default InputNewGoal