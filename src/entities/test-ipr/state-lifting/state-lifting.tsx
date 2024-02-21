import React, {useState} from "react";
import {CounterDisplay} from "./CounterDisplay.tsx";
import {DecrementButton} from "./DecrementButton.tsx";
import {IncrementButton} from "./IncrementButton.tsx";

export function stateLifting() {
    const [count, setCount] = useState<number>(0);

    const incrementCount = (): void => {
        setCount(count + 1);
    };

    const decrementCount = (): void => {
        setCount(count - 1);
    };

    return (
        <div>
            <CounterDisplay count={count} />
            <IncrementButton onIncrement={incrementCount} />
            <DecrementButton onDecrement={decrementCount} />
        </div>
    );

}
