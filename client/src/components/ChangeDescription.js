import React, {useState} from 'react';
import axios from 'axios';


function ChangeDescription(props) {

    const [descM, setDescM] = useState('');

    const makeNewDesc = (e) => {
        setDescM(e.target.value);
    }

    const handleDescChangeClick = () => {
        if (window.confirm("진짜 변경하시겠습니까?")) {
            axios
            .put("http://theone10k.kro.kr/goals", {
                headers: {
                    Authorization: `Bearar ${props.token}`,
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                timesId: props.timesId,
                description: descM
            })
            .then((res) => {
                props.setCurDesc(res.description);
            })
            .catch(e => alert(e));
        } else {
            return ;
        }
    };

    return (<div>
                <textarea placeholder='목표 설명을 변경하고 싶으시면 여기에 새 내용을 적으세요' onChange={makeNewDesc}></textarea>
                <button onClick={handleDescChangeClick}>목표 설명 변경</button>
    </div>);
}

export default ChangeDescription