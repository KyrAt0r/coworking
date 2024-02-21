import React from "react";

interface DecrementButtonProps {
    onDecrement: () => void;
}

export const DecrementButton: React.FC<DecrementButtonProps> = ({ onDecrement }) => {
    return (
        <button onClick={onDecrement}>Уменьшить</button>
    );
};
