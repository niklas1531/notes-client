import { useState } from 'react'

const Progress = ({ progress }) => {
    const [background, setBackground] = useState('green')
    const green = 'rgb(157, 224, 157)'
    const red = 'rgb(250, 171, 142)'
    const yellow = 'rgb(255, 233, 125)'

    return (
        <div className="outer-progress">
            <div
                className="inner-progress"
                style={{ width: `${progress}%`, backgroundColor: progress < '10' ? `${red}` : progress < '75' ? `${yellow}` : `${green}` }}
            ></div>
        </div>
    );
}

export default Progress;