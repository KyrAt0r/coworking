import React from "react";

interface CounterDisplayProps {
    count: number;
}

export const CounterDisplay: React.FC<CounterDisplayProps> = ({ count }) => {
    return (
        <h2>Счет: {count}</h2>
    );
};
