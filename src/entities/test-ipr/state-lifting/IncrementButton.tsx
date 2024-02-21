import React from "react";

interface IncrementButtonProps {
    onIncrement: () => void;
}

export const IncrementButton: React.FC<IncrementButtonProps> = ({ onIncrement }) => {
    return (
        <button onClick={onIncrement}>Увеличить</button>
    );
};
