import React, { useState } from 'react';

const OmmCounter: React.FC = () => {
    const [getter, setter] = useState({counter: 0});
    const inc = () => {setter({counter: getter.counter + 1})};
    const dec = () => {setter({counter: getter.counter - 1})};
    return (
        <div><span className="counter-state">{ getter.counter }</span>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
        </div></div>
    )};
export default OmmCounter;