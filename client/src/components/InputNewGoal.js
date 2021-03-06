import React, {useMemo, useState} from 'react';
import axios from 'axios';
import Select from 'react-select';
import '../css/InPutNewGoal.css'

function InputNewGoal(props) {

    const [newGoalName, setNewGoalName] = useState('');
    const [desc, setDesc] = useState('');
    const [totalTime, setTotalTime] = useState('');

    const timeOptions = [
        { value: 36000, label: '10 hours', color:"orange"},
        { value: 360000, label: '100 hours', color: "skyblue" },
        { value: 3600000, label: '1000 hours', color: "orange" },
        { value: 36000000, label: '10K hours', color: "skyblue" }
      ];


    const goalOptions = [
        { value: '๊ฐ๋ฐ', label: '๊ฐ๋ฐ๐งโ๐ป', color: "orange" },
        { value: '์์', label: '์์๐โโ๏ธ', color: "skyblue" },
        { value: '๋ง๋ผํค', label: '๋ง๋ผํค๐โโ๏ธ', color: "orange" },
        { value: 'ํฌ์ค', label: 'ํฌ์ค๐ช', color: "skyblue" },
        { value: '๊ทธ๋ฆผ', label: '๊ทธ๋ฆผ๐จ', color: "orange" },
        { value: '๊ฒ์', label: '๊ฒ์๐ฎ', color: "skyblue" },
        { value: '๋์', label: '๋์๐', color: "orange" },
        { value: '๊ณต๋ถ', label: '๊ณต๋ถ๐', color: "skyblue" },
        { value: '๋๊ตฌ', label: '๋๊ตฌ๐', color: "orange" },
        { value: 'ํ๋ก์ ํธ', label: 'ํ๋ก์ ํธ๐ป', color: "skyblue" },
      ];

      const customStyles = useMemo(
        () => ({
            option: (provided, state) => ({
                ...provided,
                border: "1px dotted black",
                color: 'black',
                backgroundColor: state.data.color,
                // opacity: 0.8,
                padding: 20,
              }),
          control: (provided) => ({
            ...provided,
            border: "2px solid pink",
            width: 300,
            background: "white",
          }),
          singleValue: (provided, state) => ({
            ...provided,
            color: state.data.color,
          }),
        }),
        []
      );

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
            alert("๋ชจ๋  ๋ชฉํ ์ด๋ฆ, ๋ชฉํ ์ค๋ช, ๋ชฉํ ์๊ฐ์ ๋ชจ๋ ์ค์ ํด์ฃผ์๊ธฐ ๋ฐ๋๋๋ค.");
        } else {
            axios
                .post("http://theone10k.kro.kr/goals", {
                    goalName: newGoalName.value,
                    description: desc,
                    email: props.userInfo.email,
                    totalTime: String(totalTime.value),
                    accTime: '0'
                },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true
                    })
                .then((res) => {
                    const newTimes = [...props.times];
                    newTimes.push(res);
                    props.setTimes(newTimes);
                    props.setNewGoalList(res) // ๋ค์ ๋ ๋๋ง์ ํ๊ธฐ ์ํด์
                    document.querySelector('.inputform').value = '';
                })
                .catch(e => e);
        }
    };

    return (<div>
                <Select placeholder={<div>๋ชฉํ ์ ํ</div>} value={newGoalName} onChange={handleSelectGoal} options={goalOptions} styles={customStyles}></Select>
                <textarea className="inputform" placeholder="๋ชฉํ๋ฅผ ์ํ ๋ค์ง์ด๋ ์ธ๋ถ์ฌํญ์ ๊ฐ๋จํ๊ฒ ์ ์ด์ฃผ์ธ์" onChange={(e) => inputDesc(e)} />
                <Select placeholder={<div>๋ชฉํ ์๊ฐ ์ ํ</div>} value={totalTime} onChange={handleTimeChange} options={timeOptions} styles={customStyles}></Select>
                <button className="input_button_form" onClick={handleAddGoalClick}>๋ชฉํ ์ค์ </button>
    </div>);
}

export default InputNewGoal